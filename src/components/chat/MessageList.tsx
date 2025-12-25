'use client';

import { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';
import type { Message } from '@/types';

function LoopsIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className={className}
    >
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" />
      <path d="M12 6c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6z" />
    </svg>
  );
}

interface MessageBubbleProps {
  message: Message;
}

function AgentMessage({ message }: MessageBubbleProps) {
  return (
    <div className="max-w-[480px] w-full">
      <div className="flex flex-col gap-2 bg-[#F0F0F0] py-3 px-4 rounded-tl-[20px] rounded-tr-[20px] rounded-br-[20px] rounded-bl-[8px]">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-full border-2 border-black flex items-center justify-center shrink-0">
            <LoopsIcon className="h-5 w-5" />
          </div>
          <span className="font-semibold text-base leading-6">Loops Assistant</span>
        </div>
        <p className="text-base leading-6 font-normal text-black">
          {message.content}
        </p>
        <span className="text-xs leading-4 font-normal text-muted-foreground block text-right">
          {message.timestamp}
        </span>
      </div>
    </div>
  );
}

function UserMessage({ message }: MessageBubbleProps) {
  return (
    <div className="max-w-[480px] w-full ml-auto">
      <div className="flex flex-col gap-2 bg-black py-3 px-4 rounded-tl-[20px] rounded-tr-[20px] rounded-bl-[20px] rounded-br-[8px]">
        <p className="text-base leading-6 font-normal text-white">
          {message.content}
        </p>
        <span className="text-xs leading-4 font-normal text-white/60 block text-right">
          {message.timestamp}
        </span>
      </div>
    </div>
  );
}

function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.sender === 'user';
  return isUser ? <UserMessage message={message} /> : <AgentMessage message={message} />;
}

interface MessageListProps {
  messages: Message[];
  className?: string;
}

export function MessageList({ messages, className }: MessageListProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  if (messages.length === 0) {
    return null;
  }

  return (
    <div className={cn('flex-1 flex flex-col justify-end pb-4', className)} ref={scrollRef}>
      <div className="flex flex-col gap-4 px-4 max-w-[640px] mx-auto w-full">
        {messages.map((message) => (
          <MessageBubble key={message.id} message={message} />
        ))}
      </div>
    </div>
  );
}
