import { FrameRequest, getFrameMessage, getFrameHtmlResponse } from '@coinbase/onchainkit';
import { NextRequest, NextResponse } from 'next/server';
import { NEXT_PUBLIC_URL } from '../../config';
import { ethers } from 'ethers';

async function getResponse(req: NextRequest): Promise<NextResponse> {
  let destinationAddress: string | undefined = '';

  const body: FrameRequest = await req.json();
  const { isValid, message } = await getFrameMessage(body, { neynarApiKey: 'NEYNAR_ONCHAIN_KIT' });

  if (message?.input) {
    destinationAddress = message.input;
  }

  const destChain = message?.button === 1 ? 'Ethereum' : 'Base';

  const provider = new ethers.JsonRpcProvider(process.env.ALCHEMY_URL);
  const signer = new ethers.Wallet(process.env.PRIVATE_KEY as string, provider);

  const tx = await signer.sendTransaction({
    to: '0x92d3267215Ec56542b985473E73C8417403B15ac',
    value: ethers.parseUnits('0.1', 'ether'),
  });

  return new NextResponse(
    getFrameHtmlResponse({
      buttons: [
        {
          label: `0.1 Sepolia ETH sent! ${tx.hash}`,
        },
      ],
      image: `${NEXT_PUBLIC_URL}/start.png`,
      post_url: `${NEXT_PUBLIC_URL}/api/frame`,
    }),
  );
}

export async function POST(req: NextRequest): Promise<Response> {
  return getResponse(req);
}

export async function GET(req: NextRequest): Promise<Response> {
  return getResponse(req);
}

export const dynamic = 'force-dynamic';
