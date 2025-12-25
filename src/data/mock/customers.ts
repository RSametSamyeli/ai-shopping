import type { Customer } from '@/types';

export const MOCK_CUSTOMERS: Customer[] = [
  {
    id: 'cust_1',
    name: 'Sarah Johnson',
    email: 'sarah.johnson@email.com',
    phone: '+1 (555) 123-4567',
    totalOrders: 12,
    totalSpent: 2847.0,
    memberSince: 'Jan 2024',
    cart: [
      {
        id: 'item_1',
        name: 'Floral Midi Dress',
        variant: 'Sage Green / Size M',
        price: 289.0,
        quantity: 1,
        image: '/images/mini-dress.png',
      },
      {
        id: 'item_2',
        name: 'Leather Crossbody Bag',
        variant: 'Tan',
        price: 189.0,
        quantity: 1,
        image: '/images/bag.jpeg',
      },
    ],
  },
  {
    id: 'cust_2',
    name: 'Michael Chen',
    email: 'michael.chen@email.com',
    phone: '+1 (555) 234-5678',
    totalOrders: 5,
    totalSpent: 1234.0,
    memberSince: 'Mar 2024',
    cart: [],
  },
  {
    id: 'cust_3',
    name: 'Emma Williams',
    email: 'emma.williams@email.com',
    phone: '+1 (555) 345-6789',
    totalOrders: 8,
    totalSpent: 1890.0,
    memberSince: 'Feb 2024',
    cart: [
      {
        id: 'item_3',
        name: 'Running Shoes Pro',
        variant: 'White / Size 8',
        price: 159.0,
        quantity: 1,
        image: '/images/shoes.webp',
      },
    ],
  },
];

export function getCustomerById(id: string): Customer | undefined {
  return MOCK_CUSTOMERS.find((customer) => customer.id === id);
}
