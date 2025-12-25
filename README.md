# AI Shopping Agent Inbox

A pixel-perfect, responsive Agent Inbox UI built for Loops AI's technical case study. This application simulates an internal tool used by brands to manage AI-powered customer conversations and shopping experiences.

## Tech Stack

- **Next.js 16** - React framework with App Router
- **React 19** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS v4** - Utility-first styling
- **shadcn/ui** - UI component library
- **Framer Motion** - Animations

## Features

### Core Functionality
- **Conversation List** - Browse and filter customer conversations by status (All, Active, Completed)
- **Chat Panel** - View message history with real-time updates
- **Customer Profile** - View customer details, purchase history, and contact information
- **Shopping Cart** - Manage cart items with quantity controls and checkout flow

### UI/UX
- **Responsive Design** - Optimized for desktop, tablet, and mobile
- **Animated Sidebars** - Smooth open/close animations with Framer Motion
- **Skeleton Loading** - Shimmer effect loading states for messages
- **Empty States** - Informative empty states for cart and conversations
- **Modal Dialogs** - Checkout flow and item removal confirmation

### Accessibility
- Keyboard navigation support
- ARIA labels on interactive elements
- Focus management

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/ai-shopping.git

# Navigate to project directory
cd ai-shopping

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

### Build

```bash
# Create production build
npm run build

# Start production server
npm start
```

## Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Home page
│   └── globals.css         # Global styles
├── components/
│   ├── chat/               # Chat-related components
│   │   ├── ChatPanel.tsx
│   │   ├── MessageInput.tsx
│   │   ├── MessageList.tsx
│   │   ├── NewChatView.tsx
│   │   └── QuickActions.tsx
│   ├── checkout/           # Checkout modal
│   ├── conversations/      # Conversation list
│   ├── customer/           # Customer profile & cart
│   ├── layout/             # Layout components
│   │   ├── Header.tsx
│   │   └── InboxLayout.tsx
│   └── ui/                 # shadcn/ui components
├── context/                # React Context providers
│   └── ConversationContext.tsx
├── data/
│   └── mock/               # Mock data
├── lib/
│   ├── constants.ts        # UI text constants
│   └── utils.ts            # Utility functions
└── types/                  # TypeScript types
    └── index.ts
```

## Design

The UI is implemented based on the Figma design provided by Loops AI, focusing on:
- Pixel-accurate typography and spacing
- Consistent color tokens
- Responsive breakpoints
- Micro-interactions and animations

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Create production build |
| `npm start` | Start production server |
| `npm run lint` | Run ESLint |

## License

This project was created as part of a technical case study for Loops AI.
