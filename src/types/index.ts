import type { ReactNode } from 'react';

export type QuickActionVariant = 'primary' | 'secondary';

export interface QuickAction {
  id: string;
  label: string;
  icon?: ReactNode | string;
  variant: QuickActionVariant;
}

export interface Message {
  id: string;
  content: string;
  sender: 'user' | 'agent';
  timestamp: Date;
  status?: 'sending' | 'sent' | 'delivered' | 'read';
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  phone?: string;
}

export interface CartItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

export interface Conversation {
  id: string;
  customer: Customer;
  messages: Message[];
  status: 'active' | 'pending' | 'resolved';
  lastMessageAt: Date;
  unreadCount: number;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered';
  createdAt: Date;
}
