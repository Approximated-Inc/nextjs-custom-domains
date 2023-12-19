import { type NextRequest } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  /**
  * Check if there's a header with the custom domain,
  * and if not just use the host header.
  * If you're using approximated.app the default is to
  * inject the header 'apx-incoming-host' with the custom domain.
  */
  const domain = request.headers.has('apx-incoming-host')
    ? request.headers.get('apx-incoming-host')
    : request.headers.get('host');

  return Response.json({ message: `Hello from ${domain}` });
};
