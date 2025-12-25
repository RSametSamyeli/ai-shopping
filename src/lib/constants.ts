import type { QuickAction, ConversationListItem } from '@/types';

export const DEFAULT_QUICK_ACTIONS: QuickAction[] = [
  {
    id: 'shipping',
    label: 'FREE SHIPPING INFORMATION',
    icon: '📦 ',
    variant: 'primary',
  },
  {
    id: 'order',
    label: 'ORDER SUPPORT',
    variant: 'secondary',
  },
  {
    id: 'recommendations',
    label: 'PRODUCT RECOMMENDATIONS',
    variant: 'secondary',
  },
];

export const CONTENT = {
  emptyState: {
    title: 'Smart assistance for your\nshopping journey',
    subtitle:
      'Ask questions, explore products, or get help with your orders.\nOur assistant is here to guide you every step of the way.',
  },
  placeholder: 'Type your message...',
  brandName: 'LOOPS',
  conversations: {
    title: 'MY CONVERSATIONS',
    searchPlaceholder: 'Search conversations',
    filters: {
      all: 'ALL',
      active: 'ACTIVE',
      completed: 'COMPLETED',
    },
    sections: {
      today: 'TODAY',
      yesterday: 'YESTERDAY',
      last_week: 'LAST WEEK',
    },
    newChat: 'START NEW CHAT',
  },
} as const;

export const MOCK_CONVERSATIONS: ConversationListItem[] = [
  {
    id: '1',
    title: 'Product recommendations',
    subtitle: 'Looking for outfit suggestions',
    time: '5 MIN AGO',
    badgeLabel: '2 Items in cart',
    badgeVariant: 'success',
    price: '$1,078.00',
    section: 'today',
    isSelected: true,
  },
  {
    id: '2',
    title: 'Seasonal collection',
    subtitle: 'Browsing new arrivals',
    time: '1 H AGO',
    badgeLabel: 'Browsing',
    badgeVariant: 'default',
    price: '',
    section: 'today',
  },
  {
    id: '3',
    title: 'Running Shoes',
    subtitle: 'Order delivered',
    time: '5 MIN AGO',
    badgeLabel: 'Completed',
    badgeVariant: 'muted',
    price: '$890.00',
    section: 'yesterday',
  },
  {
    id: '4',
    title: 'Blue Sweater Search',
    subtitle: 'Order Completed',
    time: '6 DAYS AGO',
    badgeLabel: 'Completed',
    badgeVariant: 'muted',
    price: '$240.00',
    section: 'last_week',
  },
];
