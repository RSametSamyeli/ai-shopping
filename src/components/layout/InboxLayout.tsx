'use client';

import { useState } from 'react';
import { Header } from './Header';
import { cn } from '@/lib/utils';

interface InboxLayoutProps {
  conversationList: React.ReactNode;
  chatPanel: React.ReactNode;
  customerProfile: React.ReactNode;
}

export function InboxLayout({
  conversationList,
  chatPanel,
  customerProfile,
}: InboxLayoutProps) {
  const [isConversationsOpen, setIsConversationsOpen] = useState(false);
  const [isCustomerPanelOpen, setIsCustomerPanelOpen] = useState(false);

  return (
    <div className="flex h-screen flex-col">
      <Header
        onToggleConversations={() => setIsConversationsOpen(!isConversationsOpen)}
        onToggleCustomerPanel={() => setIsCustomerPanelOpen(!isCustomerPanelOpen)}
        isConversationsOpen={isConversationsOpen}
        isCustomerPanelOpen={isCustomerPanelOpen}
      />

      <div className="relative flex flex-1 overflow-hidden">
        <aside
          className={cn(
            'absolute left-0 top-0 z-10 h-full w-80 border-r border-border-light bg-white transition-transform duration-300 ease-in-out',
            isConversationsOpen ? 'translate-x-0' : '-translate-x-full'
          )}
        >
          {conversationList}
        </aside>

        <main className="flex-1 overflow-x-hidden">
          {chatPanel}
        </main>

        <aside
          className={cn(
            'absolute right-0 top-0 z-10 h-full w-80 border-l border-border-light bg-white transition-transform duration-300 ease-in-out',
            isCustomerPanelOpen ? 'translate-x-0' : 'translate-x-full'
          )}
        >
          {customerProfile}
        </aside>
      </div>
    </div>
  );
}
