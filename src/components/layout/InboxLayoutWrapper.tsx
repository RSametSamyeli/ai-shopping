'use client';

import { ConversationProvider } from '@/context/ConversationContext';
import { InboxLayout } from './InboxLayout';
import { ConversationList } from '@/components/conversations/ConversationList';
import { ChatPanel } from '@/components/chat/ChatPanel';
import { CustomerProfile } from '@/components/customer/CustomerProfile';
import type { ConversationListItem, Customer, QuickAction } from '@/types';

interface InboxLayoutWrapperProps {
  initialConversations: ConversationListItem[];
  initialCustomers: Customer[];
  initialQuickActions: QuickAction[];
}

export function InboxLayoutWrapper({
  initialConversations,
  initialCustomers,
  initialQuickActions,
}: InboxLayoutWrapperProps) {
  return (
    <ConversationProvider
      initialConversations={initialConversations}
      initialCustomers={initialCustomers}
    >
      <InboxLayout
        conversationList={<ConversationList />}
        chatPanel={<ChatPanel initialQuickActions={initialQuickActions} />}
        customerProfile={<CustomerProfile />}
      />
    </ConversationProvider>
  );
}
