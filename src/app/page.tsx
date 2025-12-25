import { InboxLayout } from '@/components/layout/InboxLayout';
import { ConversationList } from '@/components/conversations/ConversationList';
import { ChatPanel } from '@/components/chat/ChatPanel';
import { CustomerProfile } from '@/components/customer/CustomerProfile';

export default function Home() {
  return (
    <InboxLayout
      conversationList={<ConversationList />}
      chatPanel={<ChatPanel />}
      customerProfile={<CustomerProfile />}
    />
  );
}
