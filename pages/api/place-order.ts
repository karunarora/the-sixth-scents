import { NextApiRequest, NextApiResponse } from 'next';
import { generateOrderId } from '../../src/lib/google-sheets';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { customerName, customerEmail, customerPhone, customerAddress, itemsJson, totalPrice } = req.body;

    // Validate required fields
    if (!customerName || !customerEmail || !customerPhone || !customerAddress || !itemsJson || !totalPrice) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Generate order ID and timestamp
    const orderId = generateOrderId();
    const timestamp = new Date().toISOString();

    // In a real implementation, you would append this to Google Sheets
    // For now, we'll simulate success and log the order
    const orderData = {
      orderId,
      customerName,
      customerEmail,
      customerPhone,
      customerAddress,
      itemsJson,
      totalPrice,
      timestamp,
    };

    console.log('New Order Received:', orderData);

    // TODO: Implement actual Google Sheets API call here
    // Example:
    // await appendToGoogleSheet('Orders', [
    //   orderId, customerName, customerEmail, customerPhone, 
    //   customerAddress, itemsJson, totalPrice, timestamp
    // ]);

    res.status(200).json({ 
      success: true, 
      orderId,
      message: 'Order submitted successfully! We will contact you soon for payment and shipping details.' 
    });

  } catch (error) {
    console.error('Error processing order:', error);
    res.status(500).json({ error: 'Failed to process order' });
  }
}