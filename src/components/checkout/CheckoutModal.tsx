'use client';

import { useState } from 'react';
import { Check, CreditCard, Package, Truck } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import type { CartItem, Customer } from '@/types';

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
}

type CheckoutStep = 'summary' | 'shipping' | 'payment' | 'confirmation';

interface CheckoutModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  customer: Customer;
  items: CartItem[];
}

function OrderSummary({ items }: { items: CartItem[] }) {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = 15.0;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  return (
    <div className="space-y-4">
      <div className="space-y-3 max-h-40 overflow-y-auto">
        {items.map((item) => (
          <div key={item.id} className="flex justify-between items-start text-sm">
            <div>
              <p className="font-medium">{item.name}</p>
              <p className="text-muted-foreground text-xs">{item.variant} x {item.quantity}</p>
            </div>
            <span>{formatCurrency(item.price * item.quantity)}</span>
          </div>
        ))}
      </div>
      <Separator />
      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-muted-foreground">Subtotal</span>
          <span>{formatCurrency(subtotal)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Shipping</span>
          <span>{formatCurrency(shipping)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Tax</span>
          <span>{formatCurrency(tax)}</span>
        </div>
        <Separator />
        <div className="flex justify-between font-semibold text-base">
          <span>Total</span>
          <span>{formatCurrency(total)}</span>
        </div>
      </div>
    </div>
  );
}

function ShippingForm() {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="text-xs text-muted-foreground mb-1.5 block">First Name</label>
          <Input placeholder="John" className="h-10" />
        </div>
        <div>
          <label className="text-xs text-muted-foreground mb-1.5 block">Last Name</label>
          <Input placeholder="Doe" className="h-10" />
        </div>
      </div>
      <div>
        <label className="text-xs text-muted-foreground mb-1.5 block">Address</label>
        <Input placeholder="123 Main Street" className="h-10" />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="text-xs text-muted-foreground mb-1.5 block">City</label>
          <Input placeholder="New York" className="h-10" />
        </div>
        <div>
          <label className="text-xs text-muted-foreground mb-1.5 block">ZIP Code</label>
          <Input placeholder="10001" className="h-10" />
        </div>
      </div>
    </div>
  );
}

function PaymentForm() {
  return (
    <div className="space-y-4">
      <div>
        <label className="text-xs text-muted-foreground mb-1.5 block">Card Number</label>
        <Input placeholder="4242 4242 4242 4242" className="h-10" />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="text-xs text-muted-foreground mb-1.5 block">Expiry Date</label>
          <Input placeholder="MM/YY" className="h-10" />
        </div>
        <div>
          <label className="text-xs text-muted-foreground mb-1.5 block">CVC</label>
          <Input placeholder="123" className="h-10" />
        </div>
      </div>
      <div>
        <label className="text-xs text-muted-foreground mb-1.5 block">Name on Card</label>
        <Input placeholder="John Doe" className="h-10" />
      </div>
    </div>
  );
}

function Confirmation({ orderNumber }: { orderNumber: string }) {
  return (
    <div className="text-center py-6">
      <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
        <Check className="h-8 w-8 text-green-600" />
      </div>
      <h3 className="font-semibold text-lg mb-2">Order Confirmed!</h3>
      <p className="text-muted-foreground text-sm mb-4">
        Thank you for your purchase. Your order number is:
      </p>
      <p className="font-mono font-semibold text-lg bg-[#F5F5F5] py-2 px-4 rounded-md inline-block">
        {orderNumber}
      </p>
      <p className="text-muted-foreground text-xs mt-4">
        A confirmation email has been sent to your email address.
      </p>
    </div>
  );
}

function StepIndicator({ currentStep }: { currentStep: CheckoutStep }) {
  const steps: { key: CheckoutStep; label: string; icon: React.ReactNode }[] = [
    { key: 'summary', label: 'Summary', icon: <Package className="h-4 w-4" /> },
    { key: 'shipping', label: 'Shipping', icon: <Truck className="h-4 w-4" /> },
    { key: 'payment', label: 'Payment', icon: <CreditCard className="h-4 w-4" /> },
  ];

  const currentIndex = steps.findIndex((s) => s.key === currentStep);

  return (
    <div className="flex items-center justify-center gap-2 mb-6">
      {steps.map((step, index) => (
        <div key={step.key} className="flex items-center">
          <div
            className={`flex items-center justify-center h-8 w-8 rounded-full ${
              index <= currentIndex
                ? 'bg-black text-white'
                : 'bg-[#F5F5F5] text-muted-foreground'
            }`}
          >
            {step.icon}
          </div>
          {index < steps.length - 1 && (
            <div
              className={`h-0.5 w-8 mx-1 ${
                index < currentIndex ? 'bg-black' : 'bg-[#E5E5E5]'
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );
}

export function CheckoutModal({ open, onOpenChange, customer, items }: CheckoutModalProps) {
  const [step, setStep] = useState<CheckoutStep>('summary');
  const [orderNumber] = useState(() => `ORD-${Date.now().toString().slice(-8)}`);

  const handleNext = () => {
    if (step === 'summary') setStep('shipping');
    else if (step === 'shipping') setStep('payment');
    else if (step === 'payment') setStep('confirmation');
  };

  const handleBack = () => {
    if (step === 'shipping') setStep('summary');
    else if (step === 'payment') setStep('shipping');
  };

  const handleClose = () => {
    onOpenChange(false);
    setTimeout(() => setStep('summary'), 300);
  };

  const stepTitles: Record<CheckoutStep, string> = {
    summary: 'Order Summary',
    shipping: 'Shipping Details',
    payment: 'Payment Information',
    confirmation: 'Order Complete',
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{stepTitles[step]}</DialogTitle>
          {step !== 'confirmation' && (
            <DialogDescription>
              {step === 'summary' && 'Review your order before proceeding'}
              {step === 'shipping' && 'Enter your shipping address'}
              {step === 'payment' && 'Enter your payment details'}
            </DialogDescription>
          )}
        </DialogHeader>

        {step !== 'confirmation' && <StepIndicator currentStep={step} />}

        <div className="mt-2">
          {step === 'summary' && <OrderSummary items={items} />}
          {step === 'shipping' && <ShippingForm />}
          {step === 'payment' && <PaymentForm />}
          {step === 'confirmation' && <Confirmation orderNumber={orderNumber} />}
        </div>

        <div className="flex gap-3 mt-4">
          {step !== 'summary' && step !== 'confirmation' && (
            <Button
              variant="outline"
              className="flex-1 h-11 rounded-none"
              onClick={handleBack}
            >
              Back
            </Button>
          )}
          {step !== 'confirmation' ? (
            <Button
              className="flex-1 h-11 rounded-none bg-[#26282B] hover:bg-[#26282B]/90"
              onClick={handleNext}
            >
              {step === 'payment' ? 'Place Order' : 'Continue'}
            </Button>
          ) : (
            <Button
              className="flex-1 h-11 rounded-none bg-[#26282B] hover:bg-[#26282B]/90"
              onClick={handleClose}
            >
              Done
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
