import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { OAuth2Client } from 'google-auth-library';
import prisma from '@storebuilder/database';
import { RegisterDto, LoginDto, AuthResponse, JwtPayload } from '@storebuilder/types';
import { AppError } from '../middleware/errorHandler';

const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

function getSecret(): string {
  const s = process.env.JWT_SECRET;
  if (!s || s.length < 32) throw new Error('JWT_SECRET must be set and at least 32 characters');
  return s;
}

export class AuthService {
  async register(dto: RegisterDto & { whatsapp?: string }): Promise<AuthResponse> {
    const existing = await prisma.user.findUnique({ where: { email: dto.email } });
    if (existing) throw new AppError(409, 'البريد الإلكتروني مسجل مسبقاً');

    const rounds = Math.min(Number(process.env.BCRYPT_ROUNDS ?? 12), 14);
    const hashed = await bcrypt.hash(dto.password, rounds);
    const user = await prisma.user.create({
      data: {
        email: dto.email,
        password: hashed,
        name: dto.name,
        role: 'MERCHANT',
        ...(dto.whatsapp ? { whatsapp: dto.whatsapp } : {}),
      },
    });

    const token = this.signToken(user.id, user.email, user.role);
    return { token, user: this.toPublic(user) };
  }

  async googleAuth(credential: string): Promise<AuthResponse> {
    if (!process.env.GOOGLE_CLIENT_ID) throw new AppError(503, 'Google Sign-In not configured');

    const ticket = await googleClient.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();
    if (!payload?.email) throw new AppError(400, 'Invalid Google token');

    const { email, name, sub: googleId } = payload;

    let user = await prisma.user.findFirst({
      where: { OR: [{ googleId }, { email }] },
    });

    if (user) {
      if (!user.googleId) {
        user = await prisma.user.update({ where: { id: user.id }, data: { googleId } });
      }
      if (!user.isActive) throw new AppError(403, 'الحساب موقوف');
    } else {
      user = await prisma.user.create({
        data: {
          email,
          name: name ?? email.split('@')[0],
          password: '',
          role: 'MERCHANT',
          googleId,
        },
      });
    }

    const token = this.signToken(user.id, user.email, user.role);
    return { token, user: this.toPublic(user) };
  }

  async login(dto: LoginDto): Promise<AuthResponse> {
    const user = await prisma.user.findUnique({ where: { email: dto.email } });
    if (!user) throw new AppError(401, 'البريد الإلكتروني أو كلمة المرور غير صحيحة');
    if (!user.isActive) throw new AppError(403, 'الحساب موقوف');
    if (!user.password) throw new AppError(400, 'هذا الحساب مرتبط بـ Google — استخدم تسجيل الدخول بـ Google');

    const valid = await bcrypt.compare(dto.password, user.password);
    if (!valid) throw new AppError(401, 'البريد الإلكتروني أو كلمة المرور غير صحيحة');

    const token = this.signToken(user.id, user.email, user.role);
    return { token, user: this.toPublic(user) };
  }

  async getMe(userId: string): Promise<AuthResponse['user']> {
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new AppError(404, 'User not found');
    return this.toPublic(user);
  }

  private toPublic(user: {
    id: string; email: string; name: string; role: string;
    plan: string; isActive: boolean; createdAt: Date;
  }): AuthResponse['user'] {
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role as AuthResponse['user']['role'],
      plan: user.plan as AuthResponse['user']['plan'],
      isActive: user.isActive,
      createdAt: user.createdAt.toISOString(),
    };
  }

  private signToken(userId: string, email: string, role: string): string {
    const payload: JwtPayload = { userId, email, role: role as JwtPayload['role'] };
    return jwt.sign(payload, getSecret(), {
      expiresIn: process.env.JWT_EXPIRES_IN ?? '7d',
    } as jwt.SignOptions);
  }
}

export const authService = new AuthService();
