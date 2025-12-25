# AI Usage Notes

## Tools Used

- **Claude Code** - Primary AI assistant for code generation, architecture decisions, and implementation guidance

## Tasks Accelerated with AI

### 1. Component Architecture & Scaffolding
- Initial project setup with Next.js 16, React 19, TypeScript, Tailwind CSS
- shadcn/ui component installation and configuration
- Creating base component structure (ConversationList, ChatPanel, CustomerProfile, etc.)

### 2. State Management
- Designing and implementing ConversationContext with React Context API
- Managing conversation selection, new chat state, and loading states

### 3. UI Implementation
- Message bubble components with proper styling and typography
- Skeleton loading components with shimmer animation
- Responsive layout with Framer Motion animations for sidebar open/close
- Empty states for shopping cart

### 4. Styling & Design System
- Tailwind CSS configuration with custom design tokens
- Consistent typography specs (font sizes, weights, line heights)
- Color variables and theme consistency

### 5. Mock Data Structure
- TypeScript types for conversations, customers, messages, cart items
- Mock data generation for testing UI states

## Examples of AI Correction

### Issue: Framer Motion Variants Type Error

**AI Generated Code:**
```tsx
const sidebarVariants: Variants = { 
closed: { 
width: 0, 
opacity: 0, 
transition: { width: { duration: 0.3, ease: [0.4, 0, 0.2, 1] } }, 
}, 
open: { 
width: 320, 
opacity: 1, 
transition: { width: { duration: 0.3, ease: [0.4, 0, 0.2, 1] } }, 
},
};
```

**Problem:** TypeScript complained about the `ease` property expecting a string but receiving a number array.

**Manual Fix:**
```tsx
const sidebarVariants: Variants = { 
closed: { 
width: 0, 
opacity: 0, 
transition: { width: { duration: 0.3, ease: 'easeInOut' } }, 
}, 
open: { 
width: 320, 
opacity: 1, 
transition: { width: { duration: 0.3, ease: 'easeInOut' } }, 
},
};
```

Changed from cubic-bezier array to string-based easing function to satisfy TypeScript types.

### Other Adjustments Made

1. **Sound file path** - AI used `/sound.mp3` but the actual file was `/notification.mp3`
2. **Empty state text** - AI generated generic placeholder text, manually updated to match Figma design ("YOUR CART IS EMPTY", "Add products to your cart while chatting to see them here.")
3. **Icon color** - AI set Sparkles icon to `text-amber-400` (yellow), changed to `text-gray-300` (light gray) per design requirements
4. **Privacy policy styling** - Adjusted font sizes and opacity values ​​to match exact Figma specs

## Conclusion

AI tools significantly accelerated the development process, especially for:
- Boilerplate code generation
- Consistent component patterns
- CSS-to-Tailwind conversions
- TypeScript type definitions

However, manual review and adjustment was necessary for:
- Architectural design
- Avoid overengineering
- Pixel-perfect design accuracy
- Type safety issues
- Project-specific file paths and naming
- Design token values ​​from Figma