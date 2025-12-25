'use client';

import type { CustomerProfile as CustomerProfileType } from '@/data/mock/customers';

interface CustomerProfileProps {
  initialCustomer: CustomerProfileType;
}

export function CustomerProfile({ initialCustomer }: CustomerProfileProps) {
  return (
    <div className="flex h-full flex-col">
      <div className="border-b border-border-light p-4">
        <h2 className="text-lg font-semibold">{initialCustomer.name}</h2>
      </div>
      <div className="flex-1 p-4">
        <p className="text-sm text-gray-500">{initialCustomer.email}</p>
        <p className="text-sm text-gray-500 mt-2">Cart: {initialCustomer.cart.length} items</p>
      </div>
    </div>
  );
}
