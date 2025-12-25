import { InboxLayout } from '@/components/layout/InboxLayout';
import { ConversationList } from '@/components/conversations/ConversationList';
import { ChatPanel } from '@/components/chat/ChatPanel';
import { CustomerProfile } from '@/components/customer/CustomerProfile';
import { getConversations } from '@/actions/conversations';
import { getQuickActions } from '@/actions/quick-actions';
import { getCustomerProfile } from '@/actions/customers';

export default async function Home() {
  const [conversations, quickActions, customer] = await Promise.all([
    getConversations(),
    getQuickActions(),
    getCustomerProfile(),
  ]);

  return (
    <InboxLayout
      conversationList={<ConversationList initialConversations={conversations} />}
      chatPanel={<ChatPanel initialQuickActions={quickActions} />}
      customerProfile={<CustomerProfile initialCustomer={customer} />}
    />
  );
}
