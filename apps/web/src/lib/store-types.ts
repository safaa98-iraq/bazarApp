export interface StoreTypeConfig {
  id: string;
  label: string;
  icon: string;
  description: string;
  unitOptions: { value: string; label: string }[];
  defaultUnit: string;
  themeColor: string;
  accentColor: string;
  templateHint: string;
  sampleCategories: string[];
}

export const STORE_TYPES: StoreTypeConfig[] = [
  {
    id: 'fashion',
    label: 'الملابس والأزياء',
    icon: '👗',
    description: 'متجر ملابس، أحذية، إكسسوارات نسائية ورجالية',
    unitOptions: [
      { value: 'piece', label: 'قطعة' },
      { value: 'set', label: 'طقم' },
      { value: 'pair', label: 'زوج' },
    ],
    defaultUnit: 'piece',
    themeColor: '#7C3F6B',
    accentColor: '#D4547A',
    templateHint: 'bold',
    sampleCategories: ['فساتين', 'عبايات', 'أحذية', 'حقائب', 'إكسسوارات'],
  },
  {
    id: 'beauty',
    label: 'البشرة والمكياج',
    icon: '💄',
    description: 'مستحضرات تجميل، عناية بالبشرة، إكسسوارات تجميل',
    unitOptions: [
      { value: 'piece', label: 'قطعة' },
      { value: 'ml', label: 'مل' },
      { value: 'g', label: 'غرام' },
      { value: 'set', label: 'طقم' },
    ],
    defaultUnit: 'piece',
    themeColor: '#9B3A6B',
    accentColor: '#E8627A',
    templateHint: 'magazine',
    sampleCategories: ['مكياج', 'عناية بالبشرة', 'كريمات', 'أقنعة', 'أظافر'],
  },
  {
    id: 'electronics',
    label: 'الألعاب والإلكترونيات',
    icon: '🎮',
    description: 'أجهزة ألعاب، هواتف، حواسيب، ملحقات، بطاقات شحن',
    unitOptions: [
      { value: 'piece', label: 'قطعة' },
      { value: 'unit', label: 'وحدة' },
      { value: 'key', label: 'مفتاح' },
      { value: 'card', label: 'بطاقة' },
      { value: 'license', label: 'ترخيص' },
    ],
    defaultUnit: 'piece',
    themeColor: '#1A0A2E',
    accentColor: '#7C3AED',
    templateHint: 'bold',
    sampleCategories: ['PS5', 'Xbox', 'PC Gaming', 'هواتف', 'بطاقات شحن'],
  },
];

export function getStoreType(id: string): StoreTypeConfig {
  return STORE_TYPES.find(t => t.id === id) ?? STORE_TYPES[0];
}
