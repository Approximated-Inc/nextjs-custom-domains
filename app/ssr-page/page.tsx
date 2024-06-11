import { headers } from 'next/headers';

export default function Page() {
  /**
  * Check if there's a header with the custom domain,
  * and if not just use the host header.
  * If you're using approximated.app the default is to
  * inject the header 'apx-incoming-host' with the custom domain.
  */
  const domain = headers().has('apx-incoming-host')
    ? headers().get('apx-incoming-host')
    : headers().get('host');

  return <h1>{domain === process.env.NEXT_PUBLIC_APP_PRIMARY_DOMAIN ? 'Welcome to the primary domain' : `Welcome to the custom domain ${domain}`}</h1>
}