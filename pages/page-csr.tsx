import { useEffect, useState } from 'react';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export default function Page() {
  const [domain, setDomain] = useState<string>(String(process.env.NEXT_PUBLIC_APP_PRIMARY_DOMAIN));

  useEffect(() => {
    // NOTE: consider the difference between `window.location.host` (includes port) and `window.location.hostname` (only host domain name)
    const pageDomain = typeof window !== 'undefined' ? window.location.host : process.env.NEXT_PUBLIC_APP_PRIMARY_DOMAIN;

    setDomain(String(pageDomain));
  }, []);

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      {domain === process.env.NEXT_PUBLIC_APP_PRIMARY_DOMAIN ? 'Welcome to the primary domain' : `Welcome to the custom domain ${domain}`}
    </main>
  )
};
