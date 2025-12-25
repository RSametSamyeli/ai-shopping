'use server';

import { MOCK_CUSTOMER, type CustomerProfile, type CartItem } from '@/data/mock';

export async function getCustomerProfile(): Promise<CustomerProfile> {
  await new Promise((resolve) => setTimeout(resolve, 200));
  return MOCK_CUSTOMER;
}

export async function getCart(): Promise<CartItem[]> {
  await new Promise((resolve) => setTimeout(resolve, 150));
  return MOCK_CUSTOMER.cart;
}

export async function getCartTotal(): Promise<number> {
  await new Promise((resolve) => setTimeout(resolve, 50));
  return MOCK_CUSTOMER.cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
}
