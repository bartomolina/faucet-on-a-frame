import { getFrameMetadata } from "@coinbase/onchainkit";
import { Metadata } from "next";

import { env } from "@/env.mjs";
import { frame_home } from "@/lib/frames";

const frameMetadata = getFrameMetadata(frame_home());

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_URL),
  title: "faucet-on-a-frame",
  description: "Faucet on a frame",
  openGraph: {
    title: "faucet-on-a-frame",
    description: "Faucet on a frame",
    images: [`${env.NEXT_PUBLIC_URL}/image?body=🔫 Faucet on a frame`],
  },
  other: {
    ...frameMetadata,
  },
};

export default function Home() {
  return <h1>Faucet on a frame ${JSON.stringify(frameMetadata)}</h1>;
}
