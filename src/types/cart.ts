import { ExtraOption, MeatPoint, MenuItem } from '../data/menuData';

export interface CartItem {
  cartKey: string;
  item: MenuItem;
  quantity: number;
  meatPoint?: MeatPoint;
  extras: ExtraOption[];
  notes: string;
  unitTotal: number;
}

export interface OrderReceipt {
  orderCode: string;
  customerName: string;
  customerPhone: string;
  fulfillment: 'delivery' | 'pickup';
  zoneName?: string;
  address?: string;
  paymentMethod: 'pix' | 'card' | 'cash';
  eta: string;
  subtotal: number;
  deliveryFee: number;
  total: number;
  itemsCount: number;
}
