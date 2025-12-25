import type { QuickAction } from '@/types';

export const MOCK_QUICK_ACTIONS: QuickAction[] = [
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
