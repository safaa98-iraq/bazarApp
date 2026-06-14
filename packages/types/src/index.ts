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
    products: 10,
    categories: 3,
    subtitle: 'للبدء',
    features: ['100 منتجات', '3 تصنيفات', 'متجر عام', 'دعم أساسي'],
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
    features: ['منتجات غير محدودة', '20 تصنيف',  'تحليلات متقدمة', 'أولوية دعم  ', 'رصيد ذكاء اصطناعي' ,'كوبونات غير محدودة'],
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
    features: ['كل مميزات الاحترافية', 'تقارير Excel تلقائية' , 'نطاق مخصص','اضافة كل انواع المنتجات', 'رصيد ذكاء اصطناعي اكثر بزيادة 5X '],
  },
};

export const PLAN_COMPARISON: PlanComparisonRow[] = [
  { label: 'إنشاء متجر إلكتروني', FREE: true, PRO: true, ENTERPRISE: true },
  { label: 'عدد المنتجات', FREE: '10', PRO: 'غير محدود', ENTERPRISE: 'غير محدود' },
  { label: 'التصنيفات', FREE: '3', PRO: '20', ENTERPRISE: 'غير محدود' },
  { label: 'رابط المتجر (bazar.iq/store)', FREE: true, PRO: true, ENTERPRISE: true },
  { label: 'نطاق مخصص', sub: 'مثل: myshop.com', FREE: false, PRO: false, ENTERPRISE: true },
  { label: 'تخصيص شكل المتجر', FREE: true, PRO: true, ENTERPRISE: true },
  { label: 'بانرات وإعلانات ترويجية', FREE: true, PRO: true, ENTERPRISE: true },
  { label: 'قوالب تصميم متعددة', FREE: '1', PRO: '5+', ENTERPRISE: '5+' },
  { label: 'رفع صور المنتجات', FREE: true, PRO: true, ENTERPRISE: true },
  { label: 'كوبونات الخصم', FREE: '2 كوبون', PRO: 'غير محدود', ENTERPRISE: 'غير محدود' },
  { label: 'المسوقون بالعمولة', sub: 'تتبع المبيعات عبر روابط خاصة', FREE: false, PRO: '10 مسوق', ENTERPRISE: 'غير محدود' },
  { label: 'إشعارات الطلبات', FREE: true, PRO: true, ENTERPRISE: true },
  { label: 'كتابة أوصاف المنتجات بالذكاء الاصطناعي', FREE: false, PRO: '30/يوم', ENTERPRISE: '500/يوم', highlight: true },
  { label: 'اقتراحات المنتجات للعملاء', FREE: false, PRO: true, ENTERPRISE: true },
  { label: 'تحليلات المتجر', FREE: false, PRO: true, ENTERPRISE: true },
  { label: 'دعم عبر الواتساب', FREE: false, PRO: true, ENTERPRISE: true },
  { label: 'إعلانات Google AdSense', sub: 'تظهر في متجرك', FREE: 'تظهر', PRO: false, ENTERPRISE: false },
];


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

// ─── Product ──────────────────────────────────────────────────────────────────

export interface CreateProductDto {
  name: string;
  description?: string;
  price: number;
  comparePrice?: number;
  stock: number;
  categoryId?: string;
  images?: string[];
  isActive?: boolean;
  unitType?: string;
  unitLabel?: string;
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
  unitType?: string;
  unitLabel?: string;
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
  category?: CategoryPublic | null;
}

// AI types
export interface AICredits {
  used: number;
  limit: number;
  remaining: number;
}

export interface AIDescriptionResult {
  description: string;
  seoTitle: string;
  seoDescription: string;
}

export interface AIPriceResult {
  suggestedPrice: number;
  reasoning: string;
  priceRange: { min: number; max: number };
}

export interface RecommendedProduct {
  id: string;
  name: string;
  price: number;
  comparePrice: number | null;
  images: string[];
  categoryId: string | null;
  viewCount: number;
}

// ─── Category ─────────────────────────────────────────────────────────────────

export interface CreateCategoryDto {
  name: string;
  slug: string;
}

export interface CategoryPublic {
  id: string;
  storeId: string;
  name: string;
  slug: string;
}

// ─── Order ────────────────────────────────────────────────────────────────────

export type OrderStatusType = 'PENDING' | 'PAID' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED';

export interface ShippingAddress {
  line1: string;
  line2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

export interface CreateOrderDto {
  storeId: string;
  customerEmail: string;
  customerName: string;
  items: { productId: string; quantity: number }[];
  shippingAddress: ShippingAddress;
  stripePaymentId?: string;
}

export interface OrderPublic {
  id: string;
  storeId: string;
  customerId: string | null;
  customerEmail: string;
  customerName: string;
  total: number;
  status: OrderStatusType;
  shippingAddress: ShippingAddress;
  stripePaymentId: string | null;
  createdAt: string;
  items: OrderItemPublic[];
  store?: { name: string; slug: string };
}

export interface OrderItemPublic {
  id: string;
  productId: string;
  quantity: number;
  price: number;
  product?: { name: string; images: string[] };
}

// ─── Cart ─────────────────────────────────────────────────────────────────────

export interface CartItemDto {
  productId: string;
  quantity: number;
}

export interface CartPublic {
  id: string;
  storeId: string;
  items: CartItemPublic[];
}

export interface CartItemPublic {
  id: string;
  productId: string;
  quantity: number;
  product: ProductPublic;
}

// ─── Admin ────────────────────────────────────────────────────────────────────

export type AdminActionType =
  | 'MERCHANT_ACTIVATED'
  | 'MERCHANT_DEACTIVATED'
  | 'MERCHANT_DELETED'
  | 'MERCHANT_PLAN_CHANGED'
  | 'MERCHANT_NOTIFIED'
  | 'STORE_ENABLED'
  | 'STORE_DISABLED'
  | 'STORE_SUSPENDED'
  | 'STORE_UNSUSPENDED'
  | 'STORE_EDITOR_ENTERED'
  | 'STORE_EDITOR_EXITED'
  | 'STORE_PRODUCT_UPDATED'
  | 'STORE_SETTINGS_UPDATED'
  | 'ORDER_STATUS_UPDATED';

export interface AdminLogPublic {
  id: string;
  adminId: string;
  action: string;
  targetType: string;
  targetId: string;
  details: Record<string, unknown> | null;
  storeId: string | null;
  createdAt: string;
  admin?: { name: string; email: string };
}

export interface AnalyticsData {
  totalRevenue: number;
  totalOrders: number;
  totalMerchants: number;
  activeMerchants: number;
  inactiveMerchants: number;
  totalStores: number;
  activeStores: number;
  newMerchantsThisMonth: number;
  topStores: TopStore[];
  revenueByMonth: { month: string; revenue: number }[];
}

export interface TopStore {
  storeId: string;
  storeName: string;
  slug: string;
  totalRevenue: number;
  totalOrders: number;
}

// ─── Widget ───────────────────────────────────────────────────────────────────

export interface WidgetSettings {
  widgetEnabled: boolean;
  widgetDomains: string[];
  widgetTheme: string;
  widgetRateLimit: number;
  embedCode?: string;
}

export interface WidgetProduct {
  id: string;
  name: string;
  description: string | null;
  price: number;
  comparePrice: number | null;
  images: string[];
  stock: number;
  category?: { id: string; name: string } | null;
}

export interface WidgetOrderDto {
  customerName: string;
  customerEmail: string;
  items: { productId: string; quantity: number }[];
  shippingAddress: ShippingAddress;
  stripePaymentId?: string;
}

export interface WidgetStat {
  storeId: string;
  storeName: string;
  slug: string;
  impressions: number;
  clicks: number;
  conversions: number;
  widgetEnabled: boolean;
}

// ─── Coupon ───────────────────────────────────────────────────────────────────

export interface CreateCouponDto {
  code: string;
  discountType: 'percent' | 'fixed';
  discountValue: number;
  minOrderAmount?: number;
  maxUses?: number;
  expiresAt?: string;
}

export interface UpdateCouponDto {
  isActive?: boolean;
  maxUses?: number;
  expiresAt?: string;
}

export interface CouponPublic {
  id: string;
  storeId: string;
  code: string;
  label?: string | null;
  affiliateId?: string | null;
  discountType: 'percent' | 'fixed';
  discountValue: number;
  minOrderAmount: number | null;
  maxUses: number | null;
  usedCount: number;
  expiresAt: string | null;
  isActive: boolean;
  createdAt: string;
}

export interface ApplyCouponResult {
  coupon: CouponPublic;
  discountAmount: number;
  finalTotal: number;
}

// ─── API Helpers ──────────────────────────────────────────────────────────────

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface PaginationQuery {
  page?: number;
  limit?: number;
  search?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}
