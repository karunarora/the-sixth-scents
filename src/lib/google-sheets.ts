import { GOOGLE_SHEETS_CONFIG, SAMPLE_PRODUCTS } from './constants';
import type { Product, Order, StockRequest } from '@/types/perfume';

// Apps Script Web App base URL (set in .env as VITE_APPS_SCRIPT_URL)
// Example: https://script.google.com/macros/s/XXXX/exec
const APPS_SCRIPT_URL =
  import.meta.env.VITE_APPS_SCRIPT_URL ||
  'https://script.google.com/macros/s/AKfycbxqmwugZ9S7Dw3ig0a-c_nKlS-9p2VjkawtDLmoFhzGgUNKY8UKdz0p_q1JKeFSWZIb/exec';

// Helper to coerce a dynamic value to boolean
const toBool = (v: unknown): boolean => {
  if (typeof v === 'boolean') return v;
  if (typeof v === 'string') return v.toLowerCase() === 'true';
  if (typeof v === 'number') return v !== 0;
  return false;
};

// Helper function to convert Apps Script/Sheets object row to Product
// Expecting keys: id, name, description, price, imageUrl, inStock
const objToProduct = (obj: Record<string, any>): Product => ({
  id: String(obj.id ?? ''),
  name: String(obj.name ?? ''),
  description: String(obj.description ?? ''),
  price: typeof obj.price === 'number' ? obj.price : parseFloat(String(obj.price ?? '0')) || 0,
  imageUrl: String(obj.imageUrl ?? ''),
  inStock: toBool(obj.inStock),
});

// Fetch products from Google Sheets
export async function fetchProducts(): Promise<Product[]> {
  try {
    const url = `${APPS_SCRIPT_URL}?route=products`;
    const response = await fetch(url, {
      method: 'GET',
    });
    if (!response.ok) {
      throw new Error(`Failed to fetch products: ${response.statusText}`);
    }
    const data = await response.json();
    if (!data || data.success !== true || !Array.isArray(data.data)) {
      console.log('Unexpected products payload, using sample products');
      return SAMPLE_PRODUCTS;
    }
    const products = data.data.map(objToProduct) as Product[];
    return products.filter((p) => p.id && p.name);
  } catch (error) {
    console.error('Error fetching products:', error);
    // Fallback to sample products
    return SAMPLE_PRODUCTS;
  }
}

// Submit order to Google Sheets
export async function submitOrder(order: Omit<Order, 'orderId' | 'timestamp'>): Promise<{ success: boolean; orderId?: string; error?: string }> {
  try {
    // Apps Script expects an array of items, not a JSON string field name mismatch.
    // Our CheckoutForm currently passes { itemsJson: string }. Convert here for compatibility.
    let itemsArray: unknown = [];
    try {
      const anyOrder = order as unknown as { itemsJson?: string };
      if (anyOrder.itemsJson) {
        itemsArray = JSON.parse(anyOrder.itemsJson);
      }
    } catch (_) {
      itemsArray = [];
    }

    const payload = {
      customerName: order.customerName,
      customerEmail: order.customerEmail,
      customerPhone: order.customerPhone,
      customerAddress: order.customerAddress,
      items: itemsArray,
      totalPrice: order.totalPrice,
    };

    const response = await fetch(`${APPS_SCRIPT_URL}?route=place-order`, {
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain;charset=utf-8',
      },
      body: JSON.stringify(payload),
    });

    const result = await response.json();
    if (!response.ok || result.success !== true) {
      throw new Error(result.error || 'Failed to submit order');
    }
    return { success: true, orderId: result.orderId };
  } catch (error) {
    console.error('Error submitting order:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    };
  }
}

// Submit stock request to Google Sheets
export async function submitStockRequest(perfumeId: string, perfumeName: string): Promise<{ success: boolean; error?: string }> {
  try {
    const response = await fetch(`${APPS_SCRIPT_URL}?route=request-perfume`, {
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain;charset=utf-8',
      },
      body: JSON.stringify({ perfumeId, perfumeName }),
    });

    const result = await response.json();
    if (!response.ok || result.success !== true) {
      throw new Error(result.error || 'Failed to submit stock request');
    }
    return { success: true };
  } catch (error) {
    console.error('Error submitting stock request:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    };
  }
}

// Generate unique order ID
export function generateOrderId(): string {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substr(2, 5);
  return `ORD-${timestamp}-${random}`.toUpperCase();
}