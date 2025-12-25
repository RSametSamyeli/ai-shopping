export interface CartItem {
  id: string;
  name: string;
  variant: string;
  price: number;
  quantity: number;
  image: string;
}

export interface CustomerProfile {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  totalOrders: number;
  totalSpent: number;
  memberSince: string;
  cart: CartItem[];
}

export const MOCK_CUSTOMER: CustomerProfile = {
  id: 'cust_1',
  name: 'Sarah Johnson',
  email: 'sarah.johnson@email.com',
  avatar: undefined,
  totalOrders: 12,
  totalSpent: 2847.00,
  memberSince: 'Jan 2024',
  cart: [
    {
      id: 'item_1',
      name: 'Classic White Sneakers',
      variant: 'Size 8 / White',
      price: 129.00,
      quantity: 1,
      image: '/products/sneakers.jpg',
    },
    {
      id: 'item_2',
      name: 'Leather Crossbody Bag',
      variant: 'Brown',
      price: 249.00,
      quantity: 1,
      image: '/products/bag.jpg',
    },
    {
      id: 'item_3',
      name: 'Cashmere Sweater',
      variant: 'Size M / Navy',
      price: 189.00,
      quantity: 2,
      image: '/products/sweater.jpg',
    },
  ],
};
