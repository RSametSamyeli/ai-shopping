'use client';

import { History, Heart, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CONTENT } from '@/lib/constants';

interface HeaderProps {
  onToggleConversations: () => void;
  onToggleCustomerPanel: () => void;
  isConversationsOpen: boolean;
  isCustomerPanelOpen: boolean;
}

export function Header({
  onToggleConversations,
  onToggleCustomerPanel,
  isConversationsOpen,
  isCustomerPanelOpen,
}: HeaderProps) {
  return (
    <header className="relative flex h-14 w-full items-center justify-between border-b border-border-light px-6 py-4">
      <Button
        variant="ghost"
        size="icon"
        onClick={onToggleConversations}
        aria-label="Toggle conversations"
        aria-expanded={isConversationsOpen}
        className="h-6 w-6 p-0"
      >
        <History className="h-6 w-6" />
      </Button>

      <span className="absolute left-1/2 -translate-x-1/2 text-xl font-bold tracking-tight">
        {CONTENT.brandName}
      </span>

      <div className="flex items-center gap-5">
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggleCustomerPanel}
          aria-label="Wishlist"
          className="h-6 w-6 p-0"
        >
          <Heart className="h-6 w-6" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggleCustomerPanel}
          aria-label="Shopping cart"
          aria-expanded={isCustomerPanelOpen}
          className="h-6 w-6 p-0"
        >
          <ShoppingBag className="h-6 w-6" />
        </Button>
      </div>
    </header>
  );
}
