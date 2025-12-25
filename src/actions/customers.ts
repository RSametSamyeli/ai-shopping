'use server';

import { MOCK_CUSTOMERS, getCustomerById } from '@/data/mock';
import type { Customer, CartItem } from '@/types';

export async function getCustomers(): Promise<Customer[]> {
  await new Promise((resolve) => setTimeout(resolve, 200));
  return MOCK_CUSTOMERS;
}

export async function getCustomerProfile(customerId: string): Promise<Customer | null> {
  await new Promise((resolve) => setTimeout(resolve, 150));
  return getCustomerById(customerId) || null;
}

export async function getCart(customerId: string): Promise<CartItem[]> {
  await new Promise((resolve) => setTimeout(resolve, 100));
  const customer = getCustomerById(customerId);
  return customer?.cart || [];
}

export async function getCartTotal(customerId: string): Promise<number> {
  await new Promise((resolve) => setTimeout(resolve, 50));
  const customer = getCustomerById(customerId);
  if (!customer) return 0;
  return customer.cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
}
