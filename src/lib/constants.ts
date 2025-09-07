// Google Sheets configuration
export const GOOGLE_SHEETS_CONFIG = {
  // Replace with your actual Google Sheet ID
  SHEET_ID: import.meta.env.VITE_GOOGLE_SHEET_ID || 'your-sheet-id-here',
  // API key for accessing public sheets
  API_KEY: import.meta.env.VITE_GOOGLE_API_KEY || 'your-api-key-here',
  RANGES: {
    PRODUCTS: 'Products!A:F',
    ORDERS: 'Orders!A:H',
    REQUESTS: 'Requests!A:C'
  }
};

import type { Product } from '@/types/perfume';

// Sample products for development/demo
export const SAMPLE_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Chanel No. 5',
    description: 'The world\'s most iconic fragrance with notes of ylang-ylang, rose, and sandalwood.',
    price: 150,
    imageUrl: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=400&h=400&fit=crop&crop=center',
    inStock: true
  },
  {
    id: '2',
    name: 'Dior Sauvage',
    description: 'A fresh and woody fragrance with bergamot, pepper, and ambroxan.',
    price: 120,
    imageUrl: '/images/fragrance.jpg',
    inStock: true
  },
  {
    id: '3',
    name: 'Tom Ford Black Orchid',
    description: 'A luxurious and sensual fragrance with black orchid, spice, and dark chocolate.',
    price: 180,
    imageUrl: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?w=400&h=400&fit=crop&crop=center',
    inStock: false
  },
  {
    id: '4',
    name: 'Creed Aventus',
    description: 'A sophisticated blend of pineapple, birch, and musk.',
    price: 350,
    imageUrl: 'https://images.unsplash.com/photo-1615634260167-c8cdede054de?w=400&h=400&fit=crop&crop=center',
    inStock: true
  },
  {
    id: '5',
    name: 'Yves Saint Laurent Black Opium',
    description: 'An addictive gourmand fragrance with coffee, vanilla, and white flowers.',
    price: 110,
    imageUrl: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=400&h=400&fit=crop&crop=center',
    inStock: false
  },
  {
    id: '6',
    name: 'Maison Margiela Replica Jazz Club',
    description: 'A warm and cozy fragrance evoking the atmosphere of a jazz club.',
    price: 140,
    imageUrl: 'https://images.unsplash.com/photo-1563170351-be82bc888aa4?w=400&h=400&fit=crop&crop=center',
    inStock: true
  }
];