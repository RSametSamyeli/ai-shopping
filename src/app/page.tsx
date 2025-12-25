import { InboxLayoutWrapper } from '@/components/layout/InboxLayoutWrapper';
import { getConversations } from '@/actions/conversations';
import { getQuickActions } from '@/actions/quick-actions';
import { getCustomers } from '@/actions/customers';

export default async function Home() {
  const [conversations, quickActions, customers] = await Promise.all([
    getConversations(),
    getQuickActions(),
    getCustomers(),
  ]);

  return (
    <InboxLayoutWrapper
      initialConversations={conversations}
      initialCustomers={customers}
      initialQuickActions={quickActions}
    />
  );
}
