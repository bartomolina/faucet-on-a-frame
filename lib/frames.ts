import { FrameButtonMetadata } from "@coinbase/onchainkit";

import { env } from "@/env.mjs";

// Back home (Error / Confirmation)
export const frame_back_home = (message: string) => {
  const body = `${message}`;
  return {
    buttons: [
      {
        label: "🏠 Home",
      },
    ] as [FrameButtonMetadata, ...FrameButtonMetadata[]],
    image: `${env.NEXT_PUBLIC_URL}/api/image?body=${body}`,
    post_url: `${env.NEXT_PUBLIC_URL}/api/home`,
  };
};

// Home
export const frame_home = () => {
  // const body =
  //   "🔫 Faucet on a Frame%0D%0D🥳 Claim 0.1 Base / Ethereum Sepolia ETH / 24h%0D%0D📢 Get 1 sponsor credit per 0.2 Sepolia ETH";
  return {
    buttons: [
      {
        label: "🤑 Claim",
      },
      {
        label: "⛽️ Sponsor",
      },
    ] as [FrameButtonMetadata, ...FrameButtonMetadata[]],
    // image: `${env.NEXT_PUBLIC_URL}/api/image?body=${body}`,
    image: `http://localhost:3000/api/image?body=🔫 tmpFaucet on a Frame%0D%0D🥳 Claim 0.1 Base / Ethereum Sepolia ETH / 24h%0D%0D📢 Get 1 sponsor credit per 0.2 Sepolia ETH`,
    post_url: `${env.NEXT_PUBLIC_URL}/api/selection`,
  };
};

// Not following profiles
export const frame_not_following = () => {
  const body = `🤝 You need to follow Alchemy / Base before you can claim`;
  return {
    buttons: [
      {
        label: "🏠 Home",
      },
      {
        label: "Alchemy",
        action: "link",
        target: "https://warpcast.com/alchemyplatform",
      },
      {
        label: "Base",
        action: "link",
        target: "https://warpcast.com/base",
      },
    ] as [FrameButtonMetadata, ...FrameButtonMetadata[]],
    image: `${env.NEXT_PUBLIC_URL}/api/image?body=${body}`,
    post_url: `${env.NEXT_PUBLIC_URL}/api/home`,
  };
};

// Claim
export const frame_claim = (baseRemaining: string, ethRemaining: string) => {
  const body = `🔌 Select Network%0D%0D⛽️ Base Sepolia: ${baseRemaining} ETH%0D⛽️ Ethereum Sepolia: ${ethRemaining} ETH`;
  return {
    buttons: [
      {
        label: "🔵 Base Sepolia",
      },
      {
        label: "⚫️ Ethereum Sepolia",
      },
    ] as [FrameButtonMetadata, ...FrameButtonMetadata[]],
    image: `${env.NEXT_PUBLIC_URL}/api/image?body=${body}`,
    input: {
      text: "Address (0x...)",
    },
    post_url: `${env.NEXT_PUBLIC_URL}/api/claim`,
  };
};

// Claimed
export const frame_claimed = (
  fid: number,
  profileDisplayName: string,
  profileName: string
) => {
  const body = `🚀 0.1 Sepolia ETH sent%0D%0D👇 Visit our sponsor`;
  return {
    buttons: [
      {
        label: profileDisplayName,
        action: "post_redirect",
      },
    ] as [FrameButtonMetadata, ...FrameButtonMetadata[]],
    image: `${env.NEXT_PUBLIC_URL}/api/image?body=${body}`,
    post_url: `${env.NEXT_PUBLIC_URL}/api/sponsor-redirect?fid=${fid}&profileName=${profileName}`,
  };
};

// Sponsor
export const frame_sponsor = (
  credits: number,
  consumed: number,
  profileVisits: number
) => {
  const body = `⛽️ Send some sepolia ETH to framefaucet.eth and validate the transaction below%0D%0D🪙 Ad credits: ${credits}%0D👀 Visualizations: ${consumed}%0D🚀 Profile visits: ${profileVisits}`;
  return {
    buttons: [
      {
        label: "🔵 Base Sepolia",
      },
      {
        label: "⚫️ Ethereum Sepolia",
      },
    ] as [FrameButtonMetadata, ...FrameButtonMetadata[]],
    image: `${env.NEXT_PUBLIC_URL}/api/image?body=${body}`,
    input: {
      text: "Tx hash (0x...)",
    },
    post_url: `${env.NEXT_PUBLIC_URL}/api/sponsor`,
  };
};
