// ─── Auth ────────────────────────────────────────────────────────────────────

export interface JwtPayload {
  userId: string;
  email: string;
  role: 'SUPER_ADMIN' | 'MERCHANT' | 'CUSTOMER';
  iat?: number;
  exp?: number;
}

export interface RegisterDto {
  email: string;
  password: string;
  name: string;
}

export interface LoginDto {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user: UserPublic;
}

// ─── User ─────────────────────────────────────────────────────────────────────

export interface UserPublic {
  id: string;
  email: string;
  name: string;
  role: 'SUPER_ADMIN' | 'MERCHANT' | 'CUSTOMER';
  plan: 'FREE' | 'PRO' | 'ENTERPRISE';
  isActive: boolean;
  createdAt: string;
}

// ─── Store ────────────────────────────────────────────────────────────────────

export interface CreateStoreDto {
  name: string;
  slug: string;
  description?: string;
  theme?: string;
  template?: string;
}

export interface UpdateStoreDto {
  name?: string;
  description?: string;
  logo?: string;
  theme?: string;
  template?: string;
  isPublished?: boolean;
  builderConfig?: string;
  storeType?: string;
  currency?: string;
}

export type StoreType = 'general' | 'fashion' | 'electronics' | 'food' | 'gaming' | 'beauty' | 'sports' | 'kids' | 'books' | 'furniture';

export interface StoreTypeConfig {
  id: StoreType;
  label: string;
  icon: string;
  description: string;
  unitOptions: { value: string; label: string }[];
  defaultUnit: string;
  themeColor: string;
  templateHint: string;
}

// ─── Plans ───────────────────────────────────────────────────────────────────

export type PlanKey = 'FREE' | 'PRO' | 'ENTERPRISE';

export interface PlanConfig {
  key: PlanKey;
  nameAr: string;
  price: number;
  priceIQD: number;
  firstYearDiscountPercent?: number;
  firstYearPriceIQD?: number;
  products: number;
  categories: number;
  features: string[];
  badge?: string;
  subtitle?: string;
}

export interface PlanComparisonRow {
  label: string;
  sub?: string;
  FREE: boolean | string | null;
  PRO: boolean | string | null;
  ENTERPRISE: boolean | string | null;
  highlight?: boolean;
}

export const PLAN_ORDER: PlanKey[] = ['FREE', 'PRO', 'ENTERPRISE'];

export const PLAN_CONFIGS: Record<PlanKey, PlanConfig> = {
  FREE: {
    key: 'FREE',
    nameAr: 'المجانية',
    price: 0,
    priceIQD: 0,
    products: 75,
    categories: 3,
    subtitle: 'للبدء',
    features: ['75 منتج', '3 تصنيفات', 'متجر عام', 'دعم أساسي'],
  },
  PRO: {
    key: 'PRO',
    nameAr: 'الاحترافية',
    price: 19,
    priceIQD: 60000,
    firstYearDiscountPercent: 18,
    firstYearPriceIQD: 49200,
    products: -1,
    categories: 20,
    badge: 'الأكثر طلباً',
    subtitle: 'للنمو',
    features: ['منتجات غير محدودة', '20 تصنيف', 'تحليلات متقدمة', 'أولوية دعم', 'كوبونات غير محدودة'],
  },
  ENTERPRISE: {
    key: 'ENTERPRISE',
    nameAr: 'الأعمال',
    price: 49,
    priceIQD: 100000,
    firstYearDiscountPercent: 25,
    firstYearPriceIQD: 75000,
    products: -1,
    categories: -1,
    subtitle: 'للتوسع',
    features: ['كل مميزات الاحترافية', 'تقارير Excel تلقائية', 'نطاق مخصص', 'إضافة كل أنواع المنتجات'],
  },
};

export const PLAN_COMPARISON: PlanComparisonRow[] = [
  { label: 'إنشاء متجر إلكتروني', FREE: true, PRO: true, ENTERPRISE: true },
  { label: 'عدد المنتجات', FREE: '75', PRO: 'غير محدود', ENTERPRISE: 'غير محدود' },
  { label: 'التصنيفات', FREE: '3', PRO: '20', ENTERPRISE: 'غير محدود' },
  { label: 'رابط المتجر (bazar.iq/store)', FREE: true, PRO: true, ENTERPRISE: true },
  { label: 'نطاق مخصص', sub: 'مثل: myshop.com', FREE: false, PRO: false, ENTERPRISE: true },
  { label: 'تخصيص شكل المتجر', FREE: true, PRO: true, ENTERPRISE: true },
  { label: 'بانرات ترويجية', FREE: true, PRO: true, ENTERPRISE: true },
  { label: 'قوالب تصميم متعددة', FREE: '1', PRO: '5+', ENTERPRISE: '5+' },
  { label: 'رفع صور المنتجات', FREE: true, PRO: true, ENTERPRISE: true },
  { label: 'كوبونات الخصم', FREE: '2 كوبون', PRO: 'غير محدود', ENTERPRISE: 'غير محدود' },
  { label: 'المسوقون بالعمولة', sub: 'تتبع المبيعات عبر روابط خاصة', FREE: false, PRO: '10 مسوق', ENTERPRISE: 'غير محدود' },
  { label: 'إشعارات الطلبات', FREE: true, PRO: true, ENTERPRISE: true },
  { label: 'تحليلات المتجر', FREE: false, PRO: true, ENTERPRISE: true },
  { label: 'دعم عبر الواتساب', FREE: false, PRO: true, ENTERPRISE: true },
];

// ─── Storefront/public models ────────────────────────────────────────────────

export interface CategoryPublic {
  id: string;
  storeId: string;
  name: string;
  slug: string;
  description?: string | null;
  createdAt?: string;
}

export interface ProductPublic {
  id: string;
  storeId: string;
  name: string;
  description: string | null;
  price: number;
  comparePrice: number | null;
  images: string[];
  stock: number;
  categoryId: string | null;
  isActive: boolean;
  seoTitle?: string | null;
  seoDescription?: string | null;
  seoSlug?: string | null;
  unit?: string;
  unitLabel?: string;
  createdAt: string;
  category?: CategoryPublic | { id: string; storeId: string; name: string; slug: string } | null;
}

export interface StorePublic {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  logo: string | null;
  theme: string;
  template: string;
  isActive: boolean;
  isPublished: boolean;
  builderConfig?: string | null;
  storeType: string;
  currency: string;
  createdAt: string;
  merchant?: {
    id: string;
    name: string;
    email: string;
    plan: string;
  };
}

// ─── Product DTOs ────────────────────────────────────────────────────────────

export interface CreateProductDto {
  name: string;
  description?: string;
  price: number;
  comparePrice?: number;
  stock: number;
  categoryId?: string;
  images?: string[];
  isActive?: boolean;
  unit?: string;
  unitType?: string;
  unitLabel?: string;
  seoTitle?: string;
  seoDescription?: string;
  seoSlug?: string;
}

export interface UpdateProductDto {
  name?: string;
  description?: string;
  price?: number;
  comparePrice?: number;
  stock?: number;
  categoryId?: string;
  images?: string[];
  isActive?: boolean;
  unit?: string;
  unitType?: string;
  unitLabel?: string;
  seoTitle?: string;
  seoDescription?: string;
  seoSlug?: string;
}

// ─── Orders ──────────────────────────────────────────────────────────────────

export type OrderStatusType = 'PENDING' | 'PROCESSING' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED';

export interface CreateOrderDto {
  storeId: string;
  customerEmail: string;
  customerName: string;
  shippingAddress: Record<string, unknown>;
  stripePaymentId?: string;
  items: Array<{
    productId: string;
    quantity: number;
  }>;
}

export interface OrderPublic {
  id: string;
  storeId: string;
  customerId: string | null;
  customerEmail: string;
  customerName: string;
  total: number;
  status: OrderStatusType;
  shippingAddress: Record<string, unknown>;
  stripePaymentId: string | null;
  createdAt: string;
  items: Array<{
    id: string;
    productId: string;
    quantity: number;
    price: number;
    product?: { name: string; images: unknown };
  }>;
  store?: { name: string; slug: string };
}

// ─── Marketing / chat ────────────────────────────────────────────────────────

export interface AffiliatePublic {
  id: string;
  storeId: string;
  name: string;
  email?: string | null;
  phone?: string | null;
  platform?: string | null;
  handle?: string | null;
  followerCount?: number | null;
  commissionType: 'percent' | 'fixed';
  commissionRate: number;
  totalEarned: number;
  totalOrders: number;
  isActive: boolean;
  notes?: string | null;
  createdAt: string;
  conversions?: number;
  couponCode?: string | null;
}

export interface ConversationPublic {
  id: string;
  storeId: string;
  customerName: string;
  customerEmail: string | null;
  assignedTo: string | null;
  status: 'open' | 'resolved' | 'pending';
  lastMessage: string | null;
  lastMessageAt: string | null;
  createdAt: string;
  unreadCount?: number;
}

export interface ChatMessagePublic {
  id: string;
  conversationId: string;
  senderType: 'customer' | 'agent';
  senderName: string | null;
  body: string;
  isRead: boolean;
  createdAt: string;
}

export interface QuickReplyPublic {
  id: string;
  storeId: string;
  title: string;
  body: string;
}
