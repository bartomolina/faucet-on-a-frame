import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  client: {
    NEXT_PUBLIC_URL: z.string(1),
  },
  server: {
    FAUCET_PRIVATE_KEY: z.string(1),
    FAUCET_ADDRESS: z.string(1),
    ALCHEMY_SEPOLIA_KEY: z.string(1),
    ALCHEMY_BASE_SEPOLIA_KEY: z.string(1),
    SUPABASE_URL: z.string(1),
    SUPABASE_ANON_KEY: z.string(1),
    FARCASTER_DEVELOPER_MNEMONIC: z.string(),
    FARCASTER_DEVELOPER_FID: z.string(),
    AIRSTACK_API_KEY: z.string(),
  },
  runtimeEnv: {
    NEXT_PUBLIC_URL: process.env.NEXT_PUBLIC_URL,
    FAUCET_PRIVATE_KEY: process.env.FAUCET_PRIVATE_KEY,
    FAUCET_ADDRESS: process.env.FAUCET_ADDRESS,
    ALCHEMY_SEPOLIA_KEY: process.env.ALCHEMY_SEPOLIA_KEY,
    ALCHEMY_BASE_SEPOLIA_KEY: process.env.ALCHEMY_BASE_SEPOLIA_KEY,
    SUPABASE_URL: process.env.SUPABASE_URL,
    SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY,
    FARCASTER_DEVELOPER_MNEMONIC: process.env.FARCASTER_DEVELOPER_MNEMONIC,
    FARCASTER_DEVELOPER_FID: process.env.FARCASTER_DEVELOPER_FID,
    AIRSTACK_API_KEY: process.env.AIRSTACK_API_KEY,
  },
});
