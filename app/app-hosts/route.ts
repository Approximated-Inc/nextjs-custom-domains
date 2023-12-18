import { type NextRequest } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  const domain = request.headers.has('apx-incoming-host')
    ? request.headers.get('apx-incoming-host')
    : request.headers.get('host');

  return Response.json({ message: `Hello from ${domain}` });
};
