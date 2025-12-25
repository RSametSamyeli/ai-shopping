export const CONTENT = {
  emptyState: {
    title: 'Smart assistance for your\nshopping journey',
    subtitle:
      'Ask questions, explore products, or get help with your orders.\nOur assistant is here to guide you every step of the way.',
  },
  placeholder: 'Type your message...',
  brandName: 'LOOPS',
  shoppingCart: {
    title: 'SHOPPING CART',
    emptyState: {
      title: 'YOUR CART IS EMPTY',
      subtitle: 'Add products to your cart while chatting to see them here.',
    },
    removeDialog: {
      title: 'Remove Item',
      description: 'Are you sure you want to remove this item from your cart?',
      cancel: 'Cancel',
      confirm: 'Remove',
    },
  },
  conversations: {
    title: 'MY CONVERSATIONS',
    searchPlaceholder: 'Search conversations',
    filters: {
      all: 'ALL',
      active: 'ACTIVE',
      completed: 'COMPLETED',
    },
    sections: {
      today: 'TODAY',
      yesterday: 'YESTERDAY',
      last_week: 'LAST WEEK',
    },
    newChat: 'START NEW CHAT',
  },
  newChatActions: [
    { id: 'browse', label: 'BROWSE COLLECTIONS', variant: 'primary' },
    { id: 'business', label: 'BUSINESS CASUAL', variant: 'secondary' },
    { id: 'everyday', label: 'EVERYDAY ESSENTIALS', variant: 'secondary' },
    { id: 'bestsellers', label: 'EXPLORE BEST SELLERS', variant: 'secondary' },
  ],
} as const;
