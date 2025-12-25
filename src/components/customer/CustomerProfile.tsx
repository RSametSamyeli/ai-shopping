'use client';

import { useState } from 'react';
import { Mail, Phone, ShoppingBag, Calendar, CreditCard, Trash2, Plus, Minus } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent } from '@/components/ui/card';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { CheckoutModal } from '@/components/checkout/CheckoutModal';
import { useConversation } from '@/context/ConversationContext';
import { CONTENT } from '@/lib/constants';
import type { CartItem } from '@/types';

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
}

function getInitials(name: string): string {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

interface CartItemRowProps {
  item: CartItem;
  onQuantityChange?: (id: string, quantity: number) => void;
  onRemove?: (id: string) => void;
}

function CartItemRow({ item, onQuantityChange, onRemove }: CartItemRowProps) {
  return (
    <Card className="rounded-none border-0 border-b border-[#E5E5E5] shadow-none">
      <CardContent className="flex gap-3 p-3">
        <div className="h-16 w-16 rounded-md bg-[#F5F5F5] flex items-center justify-center shrink-0">
          {item.image ? (
            <img src={item.image} alt={item.name} className="h-full w-full object-cover rounded-md" />
          ) : (
            <ShoppingBag className="h-6 w-6 text-muted-foreground" />
          )}
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="font-medium text-sm leading-5 truncate">{item.name}</h4>
          <p className="text-xs text-muted-foreground mt-0.5">{item.variant}</p>
          <div className="flex items-center justify-between mt-2">
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                className="h-6 w-6 rounded-sm"
                onClick={() => onQuantityChange?.(item.id, item.quantity - 1)}
                disabled={item.quantity <= 1}
              >
                <Minus className="h-3 w-3" />
              </Button>
              <span className="text-sm font-medium w-6 text-center">{item.quantity}</span>
              <Button
                variant="outline"
                size="icon"
                className="h-6 w-6 rounded-sm"
                onClick={() => onQuantityChange?.(item.id, item.quantity + 1)}
              >
                <Plus className="h-3 w-3" />
              </Button>
            </div>
            <span className="font-semibold text-sm">{formatCurrency(item.price * item.quantity)}</span>
          </div>
        </div>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 shrink-0 text-muted-foreground hover:text-destructive"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>{CONTENT.shoppingCart.removeDialog.title}</AlertDialogTitle>
              <AlertDialogDescription>
                {CONTENT.shoppingCart.removeDialog.description}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel className="cursor-pointer">{CONTENT.shoppingCart.removeDialog.cancel}</AlertDialogCancel>
              <AlertDialogAction className="cursor-pointer" onClick={() => onRemove?.(item.id)}>
                {CONTENT.shoppingCart.removeDialog.confirm}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardContent>
    </Card>
  );
}

interface ShoppingCartProps {
  items: CartItem[];
  onQuantityChange?: (id: string, quantity: number) => void;
  onRemove?: (id: string) => void;
  onCheckout?: () => void;
}

function ShoppingCart({ items, onQuantityChange, onRemove, onCheckout }: ShoppingCartProps) {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal > 0 ? 15.0 : 0;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  if (items.length === 0) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center py-8 px-4 text-center">
        <div className="h-24 w-24 rounded-full bg-[#F0F0F0] flex items-center justify-center mb-6">
          <ShoppingBag className="h-12 w-12 text-black" strokeWidth={1} />
        </div>
        <h4 className="font-semibold text-base uppercase">{CONTENT.shoppingCart.emptyState.title}</h4>
        <p className="text-sm text-muted-foreground mt-2">{CONTENT.shoppingCart.emptyState.subtitle}</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <ScrollArea className="flex-1">
        {items.map((item) => (
          <CartItemRow
            key={item.id}
            item={item}
            onQuantityChange={onQuantityChange}
            onRemove={onRemove}
          />
        ))}
      </ScrollArea>

      <div className="border-t border-[#E5E5E5] p-4 space-y-2 bg-[#F9F9F9]">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Subtotal</span>
          <span>{formatCurrency(subtotal)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Shipping</span>
          <span>{formatCurrency(shipping)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Tax</span>
          <span>{formatCurrency(tax)}</span>
        </div>
        <Separator className="my-2" />
        <div className="flex justify-between font-semibold">
          <span>Total</span>
          <span>{formatCurrency(total)}</span>
        </div>
        <Button
          className="w-full mt-3 h-11 rounded-none bg-[#26282B] hover:bg-[#26282B]/90 text-white uppercase text-sm font-normal"
          onClick={onCheckout}
        >
          Proceed to Checkout
        </Button>
      </div>
    </div>
  );
}

export function CustomerProfile() {
  const { selectedCustomer, selectedConversation } = useConversation();
  const [activeTab, setActiveTab] = useState<'profile' | 'cart'>('profile');
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  if (!selectedCustomer || !selectedConversation) {
    return (
      <div className="flex h-full flex-col">
        <div className="p-4 border-b border-[#E7E7E7]">
          <h2 className="text-xs font-normal leading-4 uppercase">{CONTENT.shoppingCart.title}</h2>
        </div>
        <div className="flex flex-1 flex-col items-center justify-center px-4 text-center">
          <div className="h-24 w-24 rounded-full bg-[#F0F0F0] flex items-center justify-center mb-6">
            <ShoppingBag className="h-12 w-12 text-black" strokeWidth={1} />
          </div>
          <h3 className="font-semibold text-base uppercase">{CONTENT.shoppingCart.emptyState.title}</h3>
          <p className="text-sm text-muted-foreground mt-2">
            {CONTENT.shoppingCart.emptyState.subtitle}
          </p>
        </div>
      </div>
    );
  }

  const cartItemCount = selectedCustomer.cart.length;

  return (
    <div className="flex h-full flex-col">
      <div className="p-4 border-b border-[#E7E7E7]">
        <h2 className="text-xs font-normal leading-4 uppercase">{CONTENT.shoppingCart.title}</h2>
      </div>
      <div className="border-b border-border-light">
        <div className="flex">
          <button
            className={`flex-1 py-3 text-sm font-medium border-b-2 transition-colors ${
              activeTab === 'profile'
                ? 'border-black text-black'
                : 'border-transparent text-muted-foreground hover:text-black'
            }`}
            onClick={() => setActiveTab('profile')}
          >
            Profile
          </button>
          <button
            className={`flex-1 py-3 text-sm font-medium border-b-2 transition-colors ${
              activeTab === 'cart'
                ? 'border-black text-black'
                : 'border-transparent text-muted-foreground hover:text-black'
            }`}
            onClick={() => setActiveTab('cart')}
          >
            Cart {cartItemCount > 0 && `(${cartItemCount})`}
          </button>
        </div>
      </div>

      {activeTab === 'profile' ? (
        <ScrollArea className="flex-1">
          <div className="p-4">
            <div className="flex flex-col items-center text-center mb-6">
              <Avatar className="h-20 w-20 mb-3 border-2 border-black">
                <AvatarFallback className="bg-white text-lg font-medium">
                  {getInitials(selectedCustomer.name)}
                </AvatarFallback>
              </Avatar>
              <h3 className="font-semibold text-lg">{selectedCustomer.name}</h3>
              <p className="text-sm text-muted-foreground">Customer since {selectedCustomer.memberSince}</p>
            </div>

            <Separator className="my-4" />

            <div className="space-y-4">
              <h4 className="text-xs font-normal uppercase text-muted-foreground">Contact Information</h4>

              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-full bg-[#F5F5F5] flex items-center justify-center">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Email</p>
                  <p className="text-sm font-medium">{selectedCustomer.email}</p>
                </div>
              </div>

              {selectedCustomer.phone && (
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-full bg-[#F5F5F5] flex items-center justify-center">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Phone</p>
                    <p className="text-sm font-medium">{selectedCustomer.phone}</p>
                  </div>
                </div>
              )}
            </div>

            <Separator className="my-4" />

            <div className="space-y-4">
              <h4 className="text-xs font-normal uppercase text-muted-foreground">Purchase History</h4>

              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-full bg-[#F5F5F5] flex items-center justify-center">
                  <ShoppingBag className="h-4 w-4 text-muted-foreground" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Total Orders</p>
                  <p className="text-sm font-medium">{selectedCustomer.totalOrders} orders</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-full bg-[#F5F5F5] flex items-center justify-center">
                  <CreditCard className="h-4 w-4 text-muted-foreground" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Total Spent</p>
                  <p className="text-sm font-medium">{formatCurrency(selectedCustomer.totalSpent)}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-full bg-[#F5F5F5] flex items-center justify-center">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Member Since</p>
                  <p className="text-sm font-medium">{selectedCustomer.memberSince}</p>
                </div>
              </div>
            </div>
          </div>
        </ScrollArea>
      ) : (
        <ShoppingCart
          items={selectedCustomer.cart}
          onCheckout={() => setIsCheckoutOpen(true)}
        />
      )}

      <CheckoutModal
        open={isCheckoutOpen}
        onOpenChange={setIsCheckoutOpen}
        customer={selectedCustomer}
        items={selectedCustomer.cart}
      />
    </div>
  );
}
