'use client';

import { useState } from 'react';
import { QuickActions } from './QuickActions';
import { MessageInput } from './MessageInput';
import { MessageList } from './MessageList';
import { NewChatView } from './NewChatView';
import { MessageListSkeleton } from '@/components/ui/skeleton';
import { CONTENT } from '@/lib/constants';
import { useConversation } from '@/context/ConversationContext';
import type { QuickAction } from '@/types';

function toTitleCase(str: string) {
  return str.toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase());
}

function EmptyState() {
  const titleLines = CONTENT.emptyState.title.split('\n');
  const subtitleLines = CONTENT.emptyState.subtitle.split('\n');

  return (
    <div className="flex flex-col items-center gap-2 md:gap-4 text-center">
      <h1 className="text-[28px] md:text-[32px] font-normal leading-none">
        {titleLines.map((line, i) => (
          <span key={i}>
            {line}
            {i < titleLines.length - 1 && <br />}
          </span>
        ))}
      </h1>
      <p className="text-base leading-6 md:text-lg md:leading-7">
        {subtitleLines.map((line, i) => (
          <span key={i} className={i > 0 ? 'hidden md:inline' : ''}>
            {i > 0 && <br />}
            {line}
          </span>
        ))}
      </p>
    </div>
  );
}

function PoweredBy() {
  return (
    <div className="flex items-center justify-center gap-1.5 font-questrial text-[10px] leading-3 py-3">
      <span className="text-gray-500">POWERED BY</span>
      <span className="font-semibold text-black">{CONTENT.brandName}</span>
    </div>
  );
}

const newChatQuickActions: QuickAction[] = CONTENT.newChatActions.map((action) => ({
  id: action.id,
  label: action.label,
  variant: action.variant as 'primary' | 'secondary',
}));

interface ChatPanelProps {
  initialQuickActions: QuickAction[];
  onSendMessage?: (message: string) => void;
  onQuickAction?: (actionId: string) => void;
}

export function ChatPanel({ initialQuickActions, onSendMessage, onQuickAction }: ChatPanelProps) {
  const { selectedConversation, messages, addMessage, isNewChat, isLoadingMessages } = useConversation();
  const [quickActionText, setQuickActionText] = useState('');

  const handleQuickAction = (actionId: string) => {
    const newChatAction = newChatQuickActions.find((a) => a.id === actionId);
    const regularAction = initialQuickActions.find((a) => a.id === actionId);
    const action = newChatAction || regularAction;

    if (action) {
      setQuickActionText(toTitleCase(action.label));
    }
    onQuickAction?.(actionId);
  };

  const handleSend = (message: string) => {
    setQuickActionText('');

    if (selectedConversation) {
      addMessage({
        id: `msg_${Date.now()}`,
        content: message,
        sender: 'user',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      });
    }

    onSendMessage?.(message);
  };

  const hasActiveConversation = selectedConversation && messages.length > 0;
  const showEmptyState = !hasActiveConversation && !isNewChat;

  const quickActionsToShow = isNewChat ? newChatQuickActions : initialQuickActions;
  const showQuickActions = !hasActiveConversation;

  return (
    <div className="flex h-full flex-col">
      {hasActiveConversation ? (
        <div className="flex flex-1 flex-col overflow-hidden">
          <div className="border-b border-border-light px-4 py-3">
            <h2 className="font-medium text-base">{selectedConversation.title}</h2>
            <p className="text-xs text-muted-foreground">{selectedConversation.subtitle}</p>
          </div>
          {isLoadingMessages ? (
            <MessageListSkeleton />
          ) : (
            <MessageList messages={messages} className="flex-1" />
          )}
        </div>
      ) : isNewChat ? (
        <NewChatView />
      ) : (
        <div className="flex flex-1 flex-col items-center justify-center px-4 md:px-[72px] xl:px-6">
          <EmptyState />
        </div>
      )}

      <div className="flex flex-col items-center w-full max-w-[640px] mx-auto">
        {showQuickActions && (
          <QuickActions
            actions={quickActionsToShow}
            onActionClick={handleQuickAction}
            scrollable={isNewChat}
          />
        )}
        <MessageInput
          onSend={handleSend}
          externalValue={quickActionText}
          onExternalValueConsumed={() => setQuickActionText('')}
        />
        <PoweredBy />
      </div>
    </div>
  );
}
