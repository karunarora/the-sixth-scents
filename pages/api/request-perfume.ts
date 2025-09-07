import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { perfumeId, perfumeName } = req.body;

    // Validate required fields
    if (!perfumeId || !perfumeName) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Generate timestamp
    const timestamp = new Date().toISOString();

    // In a real implementation, you would append this to Google Sheets
    // For now, we'll simulate success and log the request
    const requestData = {
      perfumeId,
      perfumeName,
      timestamp,
    };

    console.log('Stock Request Received:', requestData);

    // TODO: Implement actual Google Sheets API call here
    // Example:
    // await appendToGoogleSheet('Requests', [perfumeId, perfumeName, timestamp]);

    res.status(200).json({ 
      success: true,
      message: 'Stock request submitted successfully! We will notify you when the item is back in stock.' 
    });

  } catch (error) {
    console.error('Error processing stock request:', error);
    res.status(500).json({ error: 'Failed to process stock request' });
  }
}