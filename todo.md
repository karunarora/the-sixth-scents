# The Instant Perfume Catalog - MVP Implementation Plan

## Project Overview
Building a headless e-commerce perfume catalog with Next.js, TypeScript, Tailwind CSS, Google Sheets integration, and Cloudinary for images.

## Core Files to Create/Modify

### 1. Configuration & Types
- `src/types/perfume.ts` - TypeScript interfaces for Product, Order, CartItem
- `src/lib/google-sheets.ts` - Google Sheets API integration utilities
- `src/lib/constants.ts` - API endpoints and configuration constants

### 2. Context & State Management
- `src/contexts/CartContext.tsx` - React Context for shopping cart state management
- `src/hooks/useCart.ts` - Custom hook for cart operations

### 3. Components
- `src/components/ProductCard.tsx` - Individual product display component
- `src/components/ProductGrid.tsx` - Grid layout for products
- `src/components/CartSidebar.tsx` - Shopping cart sidebar component
- `src/components/CheckoutForm.tsx` - Customer information form

### 4. Pages
- `src/pages/Index.tsx` - Main catalog page (modify existing)
- `src/pages/Checkout.tsx` - Checkout page with form and cart summary

### 5. API Routes (Next.js serverless functions)
- `pages/api/products.ts` - Fetch products from Google Sheets
- `pages/api/place-order.ts` - Submit orders to Google Sheets
- `pages/api/request-perfume.ts` - Submit stock requests to Google Sheets

### 6. Styling & Layout
- Update `index.html` - Change title to "Instant Perfume Catalog"
- Modify `src/App.tsx` - Add cart context provider and routing

## Features Implementation Priority
1. ✅ Template setup and project structure
2. 🔄 Types and interfaces definition
3. 🔄 Google Sheets integration utilities
4. 🔄 Cart context and state management
5. 🔄 Product display components
6. 🔄 Main catalog page
7. 🔄 Shopping cart functionality
8. 🔄 Checkout page and form
9. 🔄 API routes for backend operations
10. 🔄 Error handling and user feedback

## Key Technical Decisions
- Use React Context for client-side cart state
- Google Sheets as simple database backend
- Cloudinary URLs for optimized image delivery
- Serverless API routes for Google Sheets operations
- Responsive design with Tailwind CSS
- TypeScript for type safety

## Success Criteria
- Users can browse perfume catalog
- Add/remove items from cart
- Submit orders with customer information
- Request out-of-stock items
- Responsive design works on all devices
- Ready for Vercel deployment