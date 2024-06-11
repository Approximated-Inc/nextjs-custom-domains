// pages/api/createVirtualHost.ts
import type { NextApiRequest, NextApiResponse } from 'next';

interface ApiResponse {
  error?: string;
  data?: any;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse>
): Promise<void> {
  if (req.method === 'POST') {
    try {
      const apiKey = process.env.APPROXIMATED_API_KEY;  // Accessing the API key from environment variable
      const primaryDomain = process.env.NEXT_PUBLIC_APP_PRIMARY_DOMAIN; 
      const response = await fetch('https://cloud.approximated.app/api/vhosts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Api-Key': apiKey || '' // Using the API key from .env
        },
        body: JSON.stringify({
          incoming_address: req.body.incoming_address,
          target_address: primaryDomain || ''
        })
      });

      const data = await response.json();
      if (response.ok) {
        res.status(200).json(data);
      } else {
        res.status(response.status).json({ error: data || 'Error creating virtual host' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Failed to create virtual host due to an unexpected error' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end('Method Not Allowed');
  }
}
