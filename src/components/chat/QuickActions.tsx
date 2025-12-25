'use client';

import { cn } from '@/lib/utils';
import { DEFAULT_QUICK_ACTIONS } from '@/lib/constants';
import type { QuickAction } from '@/types';

const baseStyles = cn(
  'inline-flex items-center gap-2',
  'rounded-[20px] border-[1.5px]',
  'py-2.5 px-4',
  'font-questrial text-xs leading-4 uppercase whitespace-nowrap',
  'transition-colors focus-visible:outline-none focus-visible:ring-2'
);

const variantStyles = {
  primary: 'border-black bg-black text-white shadow-[0_0_8px_rgba(0,0,0,0.08)] hover:bg-gray-800',
  secondary: 'border-transparent bg-[#D9D9D9]/[0.88] text-black shadow-[0_0_8px_rgba(0,0,0,0.08)] hover:bg-[#D9D9D9]',
} as const;

interface QuickActionsProps {
  actions?: QuickAction[];
  onActionClick?: (actionId: string) => void;
}

export function QuickActions({
  actions = DEFAULT_QUICK_ACTIONS,
  onActionClick,
}: QuickActionsProps) {
  return (
    <div className="relative w-full">
      <div className="w-full p-2 flex flex-nowrap md:flex-wrap items-center justify-start gap-2 overflow-x-auto md:overflow-visible [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]" role="group">
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
        className="absolute right-0 top-0 w-16 h-full pointer-events-none md:hidden"
        style={{ background: 'linear-gradient(to right, transparent, white)' }}
      />
    </div>
  );
}
