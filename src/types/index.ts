export type Language = 'ja' | 'id' | 'en';

export type MenuCategoryKey = 'all' | 'sushi' | 'ramen' | 'donburi' | 'izakaya' | 'dessert';

export interface LocalizedString {
  ja: string;
  id: string;
  en: string;
}

export type MenuTag = 'chef' | 'halal' | 'spicy' | 'seasonal';

export interface MenuItem {
  id: string;
  nameKanji: string;
  nameRomaji: string;
  nameTranslated: LocalizedString;
  description: LocalizedString;
  priceIdr: number;
  priceJpy: number;
  category: MenuCategoryKey;
  image: string;
  tags: MenuTag[];
  isAvailable: boolean;
}

export interface CartItem {
  menuItem: MenuItem;
  quantity: number;
  notes?: string;
}

export type SeatingType = 'tatami' | 'counter' | 'table' | 'vip';

export interface ReservationData {
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  date: string;
  timeSlot: string;
  guestCount: number;
  seatingArea: SeatingType;
  specialNotes?: string;
}
