'use client';

export default function Page() {
  // NOTE: consider the difference between `window.location.host` (includes port) and `window.location.hostname` (only host domain name)
  const domain = typeof window !== 'undefined' ? window.location.host : process.env.NEXT_PUBLIC_APP_PRIMARY_DOMAIN;

  return <h1>{domain === process.env.NEXT_PUBLIC_APP_PRIMARY_DOMAIN ? 'Welcome to the primary domain' : `Welcome to the subdomain ${domain}`}</h1>
}