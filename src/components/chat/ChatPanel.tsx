'use client';

import { useState } from 'react';
import { QuickActions } from './QuickActions';
import { MessageInput } from './MessageInput';
import { CONTENT } from '@/lib/constants';
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

interface ChatPanelProps {
  initialQuickActions: QuickAction[];
  onSendMessage?: (message: string) => void;
  onQuickAction?: (actionId: string) => void;
}

export function ChatPanel({ initialQuickActions, onSendMessage, onQuickAction }: ChatPanelProps) {
  const [quickActionText, setQuickActionText] = useState('');

  const handleQuickAction = (actionId: string) => {
    const action = initialQuickActions.find((a) => a.id === actionId);
    if (action) {
      setQuickActionText(toTitleCase(action.label));
    }
    onQuickAction?.(actionId);
  };

  const handleSend = (message: string) => {
    setQuickActionText('');
    onSendMessage?.(message);
  };

  return (
    <div className="flex h-full flex-col">
      <div className="flex flex-1 flex-col items-center justify-center px-4 md:px-[72px] xl:px-6">
        <EmptyState />
      </div>

      <div className="flex flex-col items-center w-full max-w-[640px] mx-auto">
        <QuickActions actions={initialQuickActions} onActionClick={handleQuickAction} />
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
