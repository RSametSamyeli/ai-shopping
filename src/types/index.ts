import type { ReactNode } from 'react';

export type QuickActionVariant = 'primary' | 'secondary';

export interface QuickAction {
  id: string;
  label: string;
  icon?: ReactNode | string;
  variant: QuickActionVariant;
}

export type MessageSender = 'user' | 'agent';

export interface Message {
  id: string;
  content: string;
  sender: MessageSender;
  timestamp: string;
}

export type ConversationBadgeVariant = 'success' | 'default' | 'muted';
export type ConversationSection = 'today' | 'yesterday' | 'last_week';
export type ConversationFilter = 'all' | 'active' | 'completed';

export interface ConversationListItem {
  id: string;
  title: string;
  subtitle: string;
  time: string;
  badgeLabel: string;
  badgeVariant: ConversationBadgeVariant;
  price: string;
  section: ConversationSection;
  isSelected?: boolean;
  customerId: string;
  messages: Message[];
}

export interface CartItem {
  id: string;
  name: string;
  variant: string;
  price: number;
  quantity: number;
  image?: string;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  phone?: string;
  totalOrders: number;
  totalSpent: number;
  memberSince: string;
  cart: CartItem[];
}

export interface AppState {
  selectedConversationId: string | null;
  conversations: ConversationListItem[];
  customers: Customer[];
}
