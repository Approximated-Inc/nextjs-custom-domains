import { headers } from 'next/headers';

export default function Page() {
  const domain = headers().has('apx-incoming-host')
    ? headers().get('apx-incoming-host')
    : headers().get('host');

  return <h1>{domain === process.env.NEXT_PUBLIC_APP_PRIMARY_DOMAIN ? 'Welcome to the primary domain' : `Welcome to the subdomain ${domain}`}</h1>
}