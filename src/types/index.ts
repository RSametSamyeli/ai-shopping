import type { ReactNode } from 'react';

export type QuickActionVariant = 'primary' | 'secondary';

export interface QuickAction {
  id: string;
  label: string;
  icon?: ReactNode | string;
  variant: QuickActionVariant;
}

export type ConversationBadgeVariant = 'success' | 'default' | 'muted';

export interface ConversationListItem {
  id: string;
  title: string;
  subtitle: string;
  time: string;
  badgeLabel: string;
  badgeVariant: ConversationBadgeVariant;
  price: string;
  section: 'today' | 'yesterday' | 'last_week';
  isSelected?: boolean;
}

export type ConversationFilter = 'all' | 'active' | 'completed';
