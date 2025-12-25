'use client';

import { QuickActions } from './QuickActions';
import { MessageInput } from './MessageInput';
import { CONTENT } from '@/lib/constants';

function EmptyState() {
  const titleLines = CONTENT.emptyState.title.split('\n');
  const subtitleLines = CONTENT.emptyState.subtitle.split('\n');

  return (
    <div className="flex flex-col items-center gap-4 text-center">
      <h1 className="text-[32px] font-normal leading-none">
        {titleLines.map((line, i) => (
          <span key={i}>
            {line}
            {i < titleLines.length - 1 && <br />}
          </span>
        ))}
      </h1>
      <p className="text-lg leading-7">
        {subtitleLines.map((line, i) => (
          <span key={i}>
            {line}
            {i < subtitleLines.length - 1 && <br />}
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
  onSendMessage?: (message: string) => void;
  onQuickAction?: (actionId: string) => void;
}

export function ChatPanel({ onSendMessage, onQuickAction }: ChatPanelProps) {
  return (
    <div className="flex h-full flex-col">
      <div className="flex flex-1 flex-col items-center justify-center px-6">
        <EmptyState />
      </div>

      <div className="flex flex-col items-center w-full max-w-[640px] mx-auto">
        <QuickActions onActionClick={onQuickAction} />
        <MessageInput onSend={onSendMessage} />
        <PoweredBy />
      </div>
    </div>
  );
}
