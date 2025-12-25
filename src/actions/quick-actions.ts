'use server';

import { MOCK_QUICK_ACTIONS } from '@/data/mock';
import type { QuickAction } from '@/types';

export async function getQuickActions(): Promise<QuickAction[]> {
  await new Promise((resolve) => setTimeout(resolve, 100));
  return MOCK_QUICK_ACTIONS;
}

export async function getQuickActionById(id: string): Promise<QuickAction | null> {
  await new Promise((resolve) => setTimeout(resolve, 50));
  return MOCK_QUICK_ACTIONS.find((action) => action.id === id) || null;
}
