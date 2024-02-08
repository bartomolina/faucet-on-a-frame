import { getFrameMetadata } from '@coinbase/onchainkit';
import type { Metadata } from 'next';
import { NEXT_PUBLIC_URL } from './config';

const frameMetadata = getFrameMetadata({
  buttons: [
    {
      label: 'Ethereum Sepolia ETH',
    },
    {
      label: 'Goerli Sepolia ETH',
    },
  ],
  image: `${NEXT_PUBLIC_URL}/start.png`,
  input: {
    text: 'Enter your address (0x...)',
  },
  post_url: `${NEXT_PUBLIC_URL}/api/frame`,
});

export const metadata: Metadata = {
  title: 'bartomolina.xyz',
  description: 'LFG',
  openGraph: {
    title: 'bartomolina.xyz',
    description: 'LFG',
    images: [`${NEXT_PUBLIC_URL}/park-1.png`],
  },
  other: {
    ...frameMetadata,
  },
};

export default function Page() {
  return (
    <>
      <h1>bartomolina.xyz</h1>
    </>
  );
}
