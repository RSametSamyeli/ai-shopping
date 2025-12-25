'use client';

import { useState } from 'react';
import { Plus, Mic, Sparkles, X } from 'lucide-react';
import { CONTENT } from '@/lib/constants';

interface MessageInputProps {
  onSend?: (message: string) => void;
  onAttach?: () => void;
  onVoice?: () => void;
  onAI?: () => void;
  disabled?: boolean;
}

export function MessageInput({
  onSend,
  onAttach,
  onVoice,
  onAI,
  disabled = false,
}: MessageInputProps) {
  const [message, setMessage] = useState('');
  const [showPrivacy, setShowPrivacy] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !disabled) {
      onSend?.(message.trim());
      setMessage('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full px-2">
      <div className="w-full bg-[#EEEEEE] rounded-tl-[12px] rounded-tr-[12px] rounded-br-[20px] rounded-bl-[20px] pt-3 pr-1 pb-1 pl-1 flex flex-col gap-3">
        {showPrivacy && (
          <div className="flex items-center justify-between px-2 md:hidden">
            <p className="text-xs text-gray-500">
              BY CHATTING, YOU AGREE TO THE{' '}
              <a href="#" className="underline">PRIVACY POLICY</a>
            </p>
            <button
              type="button"
              onClick={() => setShowPrivacy(false)}
              className="p-1"
              aria-label="Dismiss"
            >
              <X className="h-4 w-4 text-gray-500" />
            </button>
          </div>
        )}
        <div
          className="w-full rounded-[16px] border-[1.5px] border-[#E5E5E5] bg-white/[0.88] p-3 flex flex-col gap-4"
          style={{
            boxShadow: '0 0.8px 5.32px rgba(0,0,0,0.0444), 0 2.68px 17.87px rgba(0,0,0,0.0656)',
          }}
        >
          <div className="flex items-center gap-0.5">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={CONTENT.placeholder}
              disabled={disabled}
              className="w-full bg-transparent text-sm leading-5 pl-0.5 outline-none placeholder:text-gray-400 disabled:cursor-not-allowed"
              aria-label="Message input"
            />
          </div>

          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={onAttach}
              disabled={disabled}
              className="flex h-8 w-8 items-center justify-center rounded-xl border border-border-light bg-white hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
              aria-label="Attach file"
            >
              <Plus className="h-5 w-5" />
            </button>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={onVoice}
                disabled={disabled}
                className="flex h-8 w-8 items-center justify-center rounded-xl border border-border-light bg-white hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
                aria-label="Voice input"
              >
                <Mic className="h-5 w-5" />
              </button>

              <button
                type="button"
                onClick={onAI}
                disabled={disabled}
                className="flex h-8 w-8 items-center justify-center rounded-xl bg-black hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
                aria-label="AI assistance"
              >
                <Sparkles className="h-5 w-5 text-amber-400" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
