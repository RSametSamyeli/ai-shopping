'use client';

import { useState } from 'react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import { Header } from './Header';
import { useConversation } from '@/context/ConversationContext';

interface InboxLayoutProps {
  conversationList: React.ReactNode;
  chatPanel: React.ReactNode;
  customerProfile: React.ReactNode;
}

const sidebarVariants: Variants = {
  closed: {
    width: 0,
    opacity: 0,
    transition: {
      width: { duration: 0.3, ease: 'easeInOut' },
      opacity: { duration: 0.2 },
    },
  },
  open: {
    width: 320,
    opacity: 1,
    transition: {
      width: { duration: 0.3, ease: 'easeInOut' },
      opacity: { duration: 0.2, delay: 0.1 },
    },
  },
};

const overlayVariants: Variants = {
  closed: {
    opacity: 0,
    transition: { duration: 0.2 },
  },
  open: {
    opacity: 1,
    transition: { duration: 0.2 },
  },
};

export function InboxLayout({
  conversationList,
  chatPanel,
  customerProfile,
}: InboxLayoutProps) {
  const { clearSelection } = useConversation();
  const [isConversationsOpen, setIsConversationsOpen] = useState(false);
  const [isCustomerPanelOpen, setIsCustomerPanelOpen] = useState(false);

  const handleLogoClick = () => {
    clearSelection();
  };

  return (
    <div className="flex h-screen flex-col">
      <Header
        onToggleConversations={() => setIsConversationsOpen(!isConversationsOpen)}
        onToggleCustomerPanel={() => setIsCustomerPanelOpen(!isCustomerPanelOpen)}
        onLogoClick={handleLogoClick}
        isConversationsOpen={isConversationsOpen}
        isCustomerPanelOpen={isCustomerPanelOpen}
      />

      <div className="relative flex flex-1 overflow-hidden">
        <AnimatePresence>
          {isConversationsOpen && (
            <>
              <motion.div
                className="absolute inset-0 z-10 bg-black/20 lg:hidden"
                variants={overlayVariants}
                initial="closed"
                animate="open"
                exit="closed"
                onClick={() => setIsConversationsOpen(false)}
              />
              <motion.aside
                className="h-full border-r border-border-light bg-white overflow-hidden shrink-0 z-20"
                variants={sidebarVariants}
                initial="closed"
                animate="open"
                exit="closed"
              >
                <div className="w-80 h-full">
                  {conversationList}
                </div>
              </motion.aside>
            </>
          )}
        </AnimatePresence>

        <main className="flex-1 overflow-x-hidden">
          {chatPanel}
        </main>

        <AnimatePresence>
          {isCustomerPanelOpen && (
            <>
              <motion.div
                className="absolute inset-0 z-10 bg-black/20 lg:hidden"
                variants={overlayVariants}
                initial="closed"
                animate="open"
                exit="closed"
                onClick={() => setIsCustomerPanelOpen(false)}
              />
              <motion.aside
                className="h-full border-l border-border-light bg-white overflow-hidden shrink-0 z-20"
                variants={sidebarVariants}
                initial="closed"
                animate="open"
                exit="closed"
              >
                <div className="w-80 h-full">
                  {customerProfile}
                </div>
              </motion.aside>
            </>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
