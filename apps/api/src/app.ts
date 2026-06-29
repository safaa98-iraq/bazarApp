import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import path from 'path';

import { errorHandler } from './middleware/errorHandler';
import authRoutes from './routes/auth';
import storeRoutes from './routes/stores';
import productRoutes from './routes/products';
import categoryRoutes from './routes/categories';
import orderRoutes from './routes/orders';
import cartRoutes from './routes/cart';
import checkoutRoutes from './routes/checkout';
import storefrontRoutes from './routes/storefront';
import adminRoutes from './routes/admin';
import uploadRoutes from './routes/upload';
import couponRoutes from './routes/coupons';
import chatRoutes from './routes/chat';
import affiliateRoutes from './routes/affiliates';
import loyaltyRoutes from './routes/loyalty';
import bannerRoutes from './routes/banners';
import billingRoutes from './routes/billing';
import notificationRoutes from './routes/notifications';
import trackRoutes from './routes/track';

const isProd = process.env.NODE_ENV === 'production';
const authRateLimitMax = Number(process.env.AUTH_RATE_LIMIT_MAX ?? (isProd ? 5 : 100));
const authRateLimitWindowMs = Number(
  process.env.AUTH_RATE_LIMIT_WINDOW_MS ?? (isProd ? 15 * 60 * 1000 : 60 * 1000)
);

// Allowed origins — from env or defaults for local dev
const allowedOrigins: string[] = isProd
  ? (process.env.ALLOWED_ORIGINS ?? '').split(',').map(o => o.trim()).filter(Boolean)
  : ['http://localhost:3000', 'http://localhost:3001', 'http://127.0.0.1:3000'];

export function createApp() {
  const app = express();

  // ── Trust proxy (needed behind nginx/load balancer) ─────────────────
  app.set('trust proxy', 1);

  // ── Security headers ─────────────────────────────────────────────────
  app.use(
    helmet({
      crossOriginResourcePolicy: { policy: 'cross-origin' }, // allow widget images
      hsts: isProd ? { maxAge: 31536000, includeSubDomains: true, preload: true } : false,
      contentSecurityPolicy: false, // managed by Next.js frontend
    })
  );

  // ── CORS ─────────────────────────────────────────────────────────────
  app.use(
    cors({
      origin: (origin, callback) => {
        // Allow requests with no origin (mobile apps, Postman, server-to-server)
        if (!origin) return callback(null, true);
        if (allowedOrigins.includes(origin)) return callback(null, true);
        callback(new Error(`CORS: origin ${origin} not allowed`));
      },
      credentials: true,
      methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization', 'x-session-id'],
      maxAge: 86400, // preflight cache 24h
    })
  );

  // ── Rate limiting ────────────────────────────────────────────────────
  // Strict: auth endpoints (5 attempts / 15 min)
  app.use(
    '/api/auth',
    rateLimit({
      windowMs: authRateLimitWindowMs,
      max: authRateLimitMax,
      standardHeaders: true,
      legacyHeaders: false,
      message: { success: false, error: 'محاولات كثيرة جداً، حاول لاحقاً' },
      skipSuccessfulRequests: true, // only count failed attempts
    })
  );

  // Moderate: public storefront
  app.use(
    '/api/storefront',
    rateLimit({
      windowMs: 60 * 1000,
      max: 120,
      standardHeaders: true,
      legacyHeaders: false,
    })
  );

  // General API
  app.use(
    '/api',
    rateLimit({
      windowMs: 60 * 1000,
      max: 200,
      standardHeaders: true,
      legacyHeaders: false,
    })
  );

  // ── Body parsing ─────────────────────────────────────────────────────
  // Stripe webhook needs raw body — mount before json()
  app.use('/api/checkout/webhook', express.raw({ type: 'application/json' }));
  app.use(express.json({ limit: '2mb' }));
  app.use(express.urlencoded({ extended: true, limit: '2mb' }));
  app.use(compression());

  // ── Logging ──────────────────────────────────────────────────────────
  if (process.env.NODE_ENV !== 'test') {
    app.use(morgan(isProd ? 'combined' : 'dev'));
  }

  // ── Static uploads (no directory listing) ────────────────────────────
  app.use(
    '/uploads',
    express.static(path.join(process.cwd(), process.env.UPLOAD_DIR ?? 'uploads'), {
      index: false,          // disable directory listing
      dotfiles: 'deny',      // block hidden files
      setHeaders: (res) => {
        res.setHeader('X-Content-Type-Options', 'nosniff');
        res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
      },
    })
  );

  // ── Health check ─────────────────────────────────────────────────────
  app.get('/health', (_req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
  });

  // ── Routes ───────────────────────────────────────────────────────────
  app.use('/api/auth', authRoutes);
  app.use('/api/stores', storeRoutes);
  app.use('/api/products', productRoutes);
  app.use('/api/categories', categoryRoutes);
  app.use('/api/orders', orderRoutes);
  app.use('/api/cart', cartRoutes);
  app.use('/api/checkout', checkoutRoutes);
  app.use('/api/storefront', storefrontRoutes);
  app.use('/api/admin', adminRoutes);
  app.use('/api/upload', uploadRoutes);
  app.use('/api/coupons', couponRoutes);
  app.use('/api/chat', chatRoutes);
  app.use('/api/affiliates', affiliateRoutes);
  app.use('/api/loyalty', loyaltyRoutes);
  app.use('/api/banners', bannerRoutes);
  app.use('/api/billing', billingRoutes);
  app.use('/api/notifications', notificationRoutes);
  app.use('/api/track', trackRoutes);

  // ── 404 ──────────────────────────────────────────────────────────────
  app.use((_req, res) => {
    res.status(404).json({ success: false, error: 'Route not found' });
  });

  app.use(errorHandler);

  return app;
}
