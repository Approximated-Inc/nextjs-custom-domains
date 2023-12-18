import type { InferGetServerSidePropsType, GetServerSideProps } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

type ApproximatedPage = {
  domain: string;
}

export const getServerSideProps = (async ({ req }) => {
  /**
  * Check if there's a header with the custom domain,
  * and if not just use the host header.
  * If you're using approximated.app the default is to
  * inject the header 'apx-incoming-host' with the custom domain.
  */
  const domain = req.headers['apx-incoming-host'] || req.headers.host || process.env.NEXT_PUBLIC_APP_PRIMARY_DOMAIN;

  // do something with the "domain"

  return { props: { domain } }
}) as GetServerSideProps<ApproximatedPage>;

export default function Home({ domain }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      {domain === process.env.NEXT_PUBLIC_APP_PRIMARY_DOMAIN ? 'Welcome to the primary domain' : `Welcome to the subdomain ${domain}`}
    </main>
  )
};
