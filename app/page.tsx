import { getFrameMetadata } from '@coinbase/onchainkit';
import type { Metadata } from 'next';

import { env } from '@/env.mjs';

const frameMetadata = getFrameMetadata({
  buttons: [
    {
      label: 'Ethereum Sepolia ETH',
    },
    {
      label: 'Goerli Sepolia ETH',
    },
  ],
  image: `${env.NEXT_PUBLIC_URL}/start.png`,
  input: {
    text: 'Enter your address (0x...)',
  },
  post_url: `${env.NEXT_PUBLIC_URL}/api/frame`,
});

export const metadata: Metadata = {
  title: 'faucet-on-a-frame.vercel.app',
  description: 'Faucet on a frame',
  openGraph: {
    title: 'faucet-on-a-frame.vercel.app',
    description: 'Faucet on a frame',
    images: [`${env.NEXT_PUBLIC_URL}/start.png`],
  },
  other: {
    ...frameMetadata,
  },
};

export default function Home() {
  return <h1>faucet-on-a-frame.vercel.app</h1>
}
