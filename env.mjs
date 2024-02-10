import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  client: {
    NEXT_PUBLIC_URL: z.string(1),
  },
  server: {
    PRIVATE_KEY: z.string(1),
    ALCHEMY_URL: z.string(1),
    SUPABASE_URL: z.string(1),
    SUPABASE_ANON_KEY: z.string(1),
  },
  runtimeEnv: {
    NEXT_PUBLIC_URL: process.env.NEXT_PUBLIC_URL,
    PRIVATE_KEY: process.env.PRIVATE_KEY,
    ALCHEMY_URL: process.env.ALCHEMY_URL,
    SUPABASE_URL: process.env.SUPABASE_URL,
    SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY,
  },
});
