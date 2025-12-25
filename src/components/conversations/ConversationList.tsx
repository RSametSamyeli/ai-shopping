'use client';

import { useState } from 'react';
import { Search, MessageSquare } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { CONTENT } from '@/lib/constants';
import type { ConversationListItem, ConversationFilter, ConversationBadgeVariant } from '@/types';

const filterCounts = {
  active: 2,
  completed: 2,
};

const badgeVariantMap: Record<ConversationBadgeVariant, 'success' | 'default' | 'muted'> = {
  success: 'success',
  default: 'default',
  muted: 'muted',
};

function ConversationAvatar() {
  return (
    <Avatar className="h-10 w-10 border-2 border-black">
      <AvatarFallback className="bg-white">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
        </svg>
      </AvatarFallback>
    </Avatar>
  );
}

interface ConversationItemProps {
  conversation: ConversationListItem;
  onClick?: (id: string) => void;
}

function ConversationItem({ conversation, onClick }: ConversationItemProps) {
  return (
    <Card
      className={cn(
        'relative cursor-pointer rounded-none border-0 border-b border-[#E5E5E5] p-3 gap-0 shadow-none bg-[#F9F9F9] transition-colors hover:bg-gray-100',
        conversation.isSelected && 'before:absolute before:left-0 before:top-0 before:h-full before:w-0.5 before:bg-[#3661A6]'
      )}
      onClick={() => onClick?.(conversation.id)}
    >
      <CardContent className="flex gap-4 p-0">
        <ConversationAvatar />
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <h3 className="font-medium text-base leading-6">{conversation.title}</h3>
            <span className="text-[10px] leading-[14px] font-normal text-muted-foreground whitespace-nowrap uppercase">{conversation.time}</span>
          </div>
          <p className="text-xs leading-4 font-light text-muted-foreground mt-1">{conversation.subtitle}</p>
          <div className="flex items-center justify-between mt-2">
            <Badge variant={badgeVariantMap[conversation.badgeVariant]} className="text-xs leading-4 font-normal">
              {conversation.badgeLabel}
            </Badge>
            {conversation.price && (
              <span className="font-semibold text-sm leading-5 text-right">{conversation.price}</span>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

interface ConversationSectionProps {
  title: string;
  conversations: ConversationListItem[];
  onItemClick?: (id: string) => void;
}

function ConversationSection({ title, conversations, onItemClick }: ConversationSectionProps) {
  if (conversations.length === 0) return null;

  return (
    <section>
      <div className="flex items-center px-3 py-1.5 bg-[#F0F0F0] backdrop-blur-[8px]">
        <span className="text-xs font-normal leading-none text-muted-foreground">{title}</span>
      </div>
      {conversations.map((conversation) => (
        <ConversationItem
          key={conversation.id}
          conversation={conversation}
          onClick={onItemClick}
        />
      ))}
    </section>
  );
}

interface ConversationListProps {
  initialConversations: ConversationListItem[];
  onConversationClick?: (id: string) => void;
  onNewChat?: () => void;
}

export function ConversationList({
  initialConversations,
  onConversationClick,
  onNewChat,
}: ConversationListProps) {
  const conversations = initialConversations;
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<ConversationFilter>('all');

  const filteredConversations = conversations.filter((conv) => {
    const matchesSearch = conv.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      conv.subtitle.toLowerCase().includes(searchQuery.toLowerCase());

    if (activeFilter === 'all') return matchesSearch;
    if (activeFilter === 'active') return matchesSearch && conv.badgeVariant !== 'muted';
    if (activeFilter === 'completed') return matchesSearch && conv.badgeVariant === 'muted';
    return matchesSearch;
  });

  const todayConversations = filteredConversations.filter((c) => c.section === 'today');
  const yesterdayConversations = filteredConversations.filter((c) => c.section === 'yesterday');
  const lastWeekConversations = filteredConversations.filter((c) => c.section === 'last_week');

  return (
    <div className="flex h-full flex-col bg-background">
      <div className="p-4">
        <h2 className="text-xs font-normal leading-4 uppercase">{CONTENT.conversations.title}</h2>

        <div className="relative mt-2">
          <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="text"
            placeholder={CONTENT.conversations.searchPlaceholder}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-7 pr-2 py-2.5 h-9 bg-[#EEEEEE] border border-[#E7E7E7] rounded-none text-xs leading-4 placeholder:text-xs placeholder:leading-4"
          />
        </div>

        <div className="flex gap-2 mt-3">
          <Button
            variant={activeFilter === 'all' ? 'default' : 'secondary'}
            size="sm"
            onClick={() => setActiveFilter('all')}
            className="rounded-full text-[10px] leading-3 font-normal h-8"
          >
            {CONTENT.conversations.filters.all}
          </Button>
          <Button
            variant={activeFilter === 'active' ? 'default' : 'secondary'}
            size="sm"
            onClick={() => setActiveFilter('active')}
            className="rounded-full text-[10px] leading-3 font-normal h-8"
          >
            {CONTENT.conversations.filters.active} ({filterCounts.active})
          </Button>
          <Button
            variant={activeFilter === 'completed' ? 'default' : 'secondary'}
            size="sm"
            onClick={() => setActiveFilter('completed')}
            className="rounded-full text-[10px] leading-3 font-normal h-8"
          >
            {CONTENT.conversations.filters.completed} ({filterCounts.completed})
          </Button>
        </div>
      </div>

      <Separator />

      <ScrollArea className="flex-1">
        <ConversationSection
          title={CONTENT.conversations.sections.today}
          conversations={todayConversations}
          onItemClick={onConversationClick}
        />
        <ConversationSection
          title={CONTENT.conversations.sections.yesterday}
          conversations={yesterdayConversations}
          onItemClick={onConversationClick}
        />
        <ConversationSection
          title={CONTENT.conversations.sections.last_week}
          conversations={lastWeekConversations}
          onItemClick={onConversationClick}
        />
      </ScrollArea>

      <div className="px-4 pt-3 pb-6">
        <Button
          onClick={onNewChat}
          className="w-full h-12 rounded-none bg-[#26282B] hover:bg-[#26282B]/90 text-white text-base leading-6 font-normal uppercase gap-2 py-2.5 px-3"
        >
          <MessageSquare className="h-5 w-5" />
          {CONTENT.conversations.newChat}
        </Button>
      </div>
    </div>
  );
}
