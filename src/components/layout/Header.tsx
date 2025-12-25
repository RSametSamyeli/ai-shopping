'use client';

import Image from 'next/image';
import { History, Heart, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface HeaderProps {
  onToggleConversations: () => void;
  onToggleCustomerPanel: () => void;
  onLogoClick: () => void;
  isConversationsOpen: boolean;
  isCustomerPanelOpen: boolean;
}

export function Header({
  onToggleConversations,
  onToggleCustomerPanel,
  onLogoClick,
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
        className="h-6 w-6 p-0 cursor-pointer"
      >
        <History className="h-6 w-6" />
      </Button>

      <button
        onClick={onLogoClick}
        className="absolute left-1/2 -translate-x-1/2 hover:opacity-70 transition-opacity cursor-pointer"
      >
        <Image
          src="/images/loops-logo.png"
          alt="Loops"
          width={106}
          height={24}
          priority
        />
      </button>

      <div className="flex items-center gap-5">
        <Button
          variant="ghost"
          size="icon"
          aria-label="Wishlist"
          className="h-6 w-6 p-0 cursor-pointer"
        >
          <Heart className="h-6 w-6" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggleCustomerPanel}
          aria-label="Shopping cart"
          aria-expanded={isCustomerPanelOpen}
          className="h-6 w-6 p-0 cursor-pointer"
        >
          <ShoppingBag className="h-6 w-6" />
        </Button>
      </div>
    </header>
  );
}
