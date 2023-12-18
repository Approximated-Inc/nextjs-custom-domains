// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type ResponseData = {
  message: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  /**
  * Check if there's a header with the custom domain,
  * and if not just use the host header.
  * If you're using approximated.app the default is to
  * inject the header 'apx-incoming-host' with the custom domain.
  */
  const domain = req.headers['apx-incoming-host'] || req.headers.host || process.env.NEXT_PUBLIC_APP_PRIMARY_DOMAIN;

  // do something with the "domain"

  res.status(200).json({ message: `Hello from ${domain}` });
};
