'use client';

import { cn } from '@/lib/utils';
import type { QuickAction } from '@/types';

const baseStyles = cn(
  'inline-flex items-center gap-2',
  'rounded-[20px] border-[1.5px]',
  'py-2.5 px-4',
  'font-questrial text-xs leading-4 uppercase whitespace-nowrap',
  'transition-colors focus-visible:outline-none focus-visible:ring-2',
  'cursor-pointer'
);

const variantStyles = {
  primary: 'border-black bg-black text-white shadow-[0_0_8px_rgba(0,0,0,0.08)] hover:bg-gray-800',
  secondary: 'border-transparent bg-[#D9D9D9]/[0.88] text-black shadow-[0_0_8px_rgba(0,0,0,0.08)] hover:bg-[#D9D9D9]',
} as const;

interface QuickActionsProps {
  actions: QuickAction[];
  onActionClick?: (actionId: string) => void;
  scrollable?: boolean;
}

export function QuickActions({
  actions,
  onActionClick,
  scrollable = false,
}: QuickActionsProps) {
  return (
    <div className="relative w-full">
      <div
        className={cn(
          'w-full p-4 md:p-2 flex flex-nowrap items-center justify-start gap-2 overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]',
          !scrollable && 'md:flex-wrap md:overflow-visible'
        )}
        role="group"
      >
        {actions.map((action) => (
          <button
            key={action.id}
            type="button"
            onClick={() => onActionClick?.(action.id)}
            className={cn(baseStyles, variantStyles[action.variant])}
          >
            {action.icon}
            {action.label}
          </button>
        ))}
      </div>
      <div
        className="absolute right-0 top-0 w-16 h-16 pointer-events-none"
        style={{ background: 'linear-gradient(to right, transparent, white)' }}
      />
    </div>
  );
}
