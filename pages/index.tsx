import type { InferGetServerSidePropsType, GetServerSideProps } from 'next';
import { Inter } from 'next/font/google';
import { useState, FormEvent } from 'react';

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
      className={`flex min-h-screen flex-col items-center gap-8 p-24 ${inter.className}`}
    >
      {domain === process.env.NEXT_PUBLIC_APP_PRIMARY_DOMAIN ? 'Welcome to the primary domain' : `Welcome to the custom domain ${domain}`}
      <DomainForm />
    </main>
  )
};

interface DomainFormData {
  incoming_address: string;
}

const DomainForm: React.FC = () => {
  const [incoming_address, setDomain] = useState<string>('');
  const [errors, setErrors] = useState<any| null>(null); // State to hold response errors
  const [success, setSuccess] = useState<string | null>(null); // State to hold success message
  const [dnsMessage, setDnsMessage] = useState<{string} | null>(null); // State to hold DNS message

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setErrors(null); // Reset errors on new submission
    setSuccess(null); // Reset message on new submission
    setDnsMessage(null); // Reset DNS message on new submission
    const formData: DomainFormData = { incoming_address };

    const response = await fetch('/api/createVirtualHost', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData)
    });

    const data = await response.json();
    if (!response.ok) {
      console.log(data);
      // Assuming the error message is in the `message` field
      if(data.error === 'Unauthorized'){
        setErrors({'unauthorized': 'Unauthorized - incorrect or missing Approximated API key.', 'help': 'Check your env variables for APPROXIMATED_API_KEY.'});
      }else{
        setErrors(data.error.errors || data.error || {'unknown': 'An unknown error occurred'});
      }
      return;
    }

    setSuccess(data.data.incoming_address)  // Handle the response as needed
    setDnsMessage(data.data.user_message)  
  };

  return (
    <form className="text-center" onSubmit={handleSubmit}>
      <div className="mb-2">
        <label htmlFor="incoming_address">Connect a custom domain</label>
      </div>
      <input
        type="text"
        id="incoming_address"
        value={incoming_address}
        onChange={(e) => setDomain(e.target.value)}
        required
        className="text-black text-left px-2 py-1 text-xs"
      />
      <button className="ml-2 border border-white rounded-md px-2 py-1 text-xs" type="submit">Submit</button>
        {dnsMessage && <div className="mt-4 mx-auto max-w-xl text-sm mb-2">{dnsMessage}</div>}
        {success && <div className="mt-2 mx-auto max-w-4xl">Once the DNS for the custom domain is set, <a href={'https://'+success} className="text-green-600 underline">Click here to view it.</a></div>}
        {errors && Object.entries(errors).map(([key, message]) => (
          <p key={key} className="text-red-500 mt-2">{message}</p>
        ))}
    </form>
  );
}
