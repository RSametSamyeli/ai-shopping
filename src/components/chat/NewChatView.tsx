'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ScrollArea } from '@/components/ui/scroll-area';

const WELCOME_MESSAGE = {
  greeting: "Hi! I'm here to help you discover products, compare options, and manage your orders.",
  question: "What would you like to do today?",
};

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

function TypingIndicator() {
  return (
    <div className="flex gap-1 px-4 py-3">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="h-2 w-2 rounded-full bg-gray-400"
          animate={{
            y: [0, -6, 0],
          }}
          transition={{
            duration: 0.6,
            repeat: Infinity,
            delay: i * 0.15,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}

function WelcomeMessage({ timestamp }: { timestamp: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="max-w-[85%]"
    >
      <div className="flex flex-col gap-2 bg-[#F0F0F0] max-w-[480px] w-full py-3 px-4 rounded-tl-[20px] rounded-tr-[20px] rounded-br-[20px] rounded-bl-[8px]">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-full border-2 border-black flex items-center justify-center">
            <LoopsIcon className="h-5 w-5" />
          </div>
          <span className="font-semibold text-base leading-6">Loops Assistant</span>
        </div>
        <p className="text-base leading-6 font-normal text-black">
          {WELCOME_MESSAGE.greeting}
        </p>
        <p className="text-base leading-6 font-normal text-black">
          {WELCOME_MESSAGE.question}
        </p>
        <span className="text-xs leading-4 font-normal text-muted-foreground block text-right">
          {timestamp}
        </span>
      </div>
    </motion.div>
  );
}

export function NewChatView() {
  const [isTyping, setIsTyping] = useState(true);
  const [timestamp, setTimestamp] = useState('');

  useEffect(() => {
    const now = new Date();
    setTimestamp(
      now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })
    );

    const timer = setTimeout(() => {
      setIsTyping(false);
      const audio = new Audio('/notification.mp3');
      audio.play().catch(() => {});
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex-1 flex flex-col justify-end pb-4">
      <div className="w-full max-w-[640px] mx-auto px-4">
        <AnimatePresence mode="wait">
          {isTyping ? (
            <motion.div
              key="typing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="max-w-[85%]"
            >
              <div className="bg-[#F5F5F5] rounded-2xl rounded-bl-md inline-block">
                <TypingIndicator />
              </div>
            </motion.div>
          ) : (
            <WelcomeMessage key="message" timestamp={timestamp} />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
