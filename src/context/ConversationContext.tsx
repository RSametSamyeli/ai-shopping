'use client';

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
  type ReactNode,
} from 'react';
import type { ConversationListItem, Customer, Message } from '@/types';

interface ConversationContextType {
  selectedConversationId: string | null;
  selectedConversation: ConversationListItem | null;
  selectedCustomer: Customer | null;
  conversations: ConversationListItem[];
  customers: Customer[];
  messages: Message[];
  isNewChat: boolean;
  isLoadingMessages: boolean;
  selectConversation: (id: string) => void;
  clearSelection: () => void;
  startNewChat: () => void;
  addMessage: (message: Message) => void;
}

const ConversationContext = createContext<ConversationContextType | null>(null);

interface ConversationProviderProps {
  children: ReactNode;
  initialConversations: ConversationListItem[];
  initialCustomers: Customer[];
}

export function ConversationProvider({
  children,
  initialConversations,
  initialCustomers,
}: ConversationProviderProps) {
  const [conversations, setConversations] = useState(initialConversations);
  const [customers] = useState(initialCustomers);
  const [selectedConversationId, setSelectedConversationId] = useState<string | null>(null);
  const [isNewChat, setIsNewChat] = useState(false);
  const [isLoadingMessages, setIsLoadingMessages] = useState(false);

  const selectedConversation = useMemo(() => {
    if (!selectedConversationId) return null;
    return conversations.find((c) => c.id === selectedConversationId) || null;
  }, [conversations, selectedConversationId]);

  const selectedCustomer = useMemo(() => {
    if (!selectedConversation) return null;
    return customers.find((c) => c.id === selectedConversation.customerId) || null;
  }, [customers, selectedConversation]);

  const messages = useMemo(() => {
    return selectedConversation?.messages || [];
  }, [selectedConversation]);

  const selectConversation = useCallback((id: string) => {
    setIsNewChat(false);
    setIsLoadingMessages(true);
    setSelectedConversationId(id);
    setConversations((prev) =>
      prev.map((c) => ({
        ...c,
        isSelected: c.id === id,
      }))
    );
    setTimeout(() => {
      setIsLoadingMessages(false);
    }, 800);
  }, []);

  const clearSelection = useCallback(() => {
    setIsNewChat(false);
    setSelectedConversationId(null);
    setConversations((prev) =>
      prev.map((c) => ({
        ...c,
        isSelected: false,
      }))
    );
  }, []);

  const startNewChat = useCallback(() => {
    setSelectedConversationId(null);
    setConversations((prev) =>
      prev.map((c) => ({
        ...c,
        isSelected: false,
      }))
    );
    setIsNewChat(true);
  }, []);

  const addMessage = useCallback((message: Message) => {
    setConversations((prev) =>
      prev.map((c) => {
        if (c.id === selectedConversationId) {
          return {
            ...c,
            messages: [...c.messages, message],
          };
        }
        return c;
      })
    );
  }, [selectedConversationId]);

  const value = useMemo(
    () => ({
      selectedConversationId,
      selectedConversation,
      selectedCustomer,
      conversations,
      customers,
      messages,
      isNewChat,
      isLoadingMessages,
      selectConversation,
      clearSelection,
      startNewChat,
      addMessage,
    }),
    [
      selectedConversationId,
      selectedConversation,
      selectedCustomer,
      conversations,
      customers,
      messages,
      isNewChat,
      isLoadingMessages,
      selectConversation,
      clearSelection,
      startNewChat,
      addMessage,
    ]
  );

  return (
    <ConversationContext.Provider value={value}>
      {children}
    </ConversationContext.Provider>
  );
}

export function useConversation() {
  const context = useContext(ConversationContext);
  if (!context) {
    throw new Error('useConversation must be used within a ConversationProvider');
  }
  return context;
}
