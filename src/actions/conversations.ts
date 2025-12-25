'use server';

import { MOCK_CONVERSATIONS } from '@/data/mock';
import type { ConversationListItem, ConversationFilter } from '@/types';

export async function getConversations(
  filter: ConversationFilter = 'all'
): Promise<ConversationListItem[]> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 300));

  if (filter === 'all') {
    return MOCK_CONVERSATIONS;
  }

  return MOCK_CONVERSATIONS.filter((conv) => {
    if (filter === 'active') return conv.badgeVariant !== 'muted';
    if (filter === 'completed') return conv.badgeVariant === 'muted';
    return true;
  });
}

export async function getConversationById(
  id: string
): Promise<ConversationListItem | null> {
  await new Promise((resolve) => setTimeout(resolve, 100));

  return MOCK_CONVERSATIONS.find((conv) => conv.id === id) || null;
}

export async function searchConversations(
  query: string
): Promise<ConversationListItem[]> {
  await new Promise((resolve) => setTimeout(resolve, 200));

  const lowercaseQuery = query.toLowerCase();
  return MOCK_CONVERSATIONS.filter(
    (conv) =>
      conv.title.toLowerCase().includes(lowercaseQuery) ||
      conv.subtitle.toLowerCase().includes(lowercaseQuery)
  );
}
