import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  /**
  * Check if there's a header with the custom domain,
  * and if not just use the host header.
  * If you're using approximated.app the default is to
  * inject the header 'apx-incoming-host' with the custom domain.
  */
  const domain = request.headers.has('apx-incoming-host')
    ? request.headers.get('apx-incoming-host')
    : request.headers.get('host');

  // do something with the "domain"

  const response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  return response;
};
