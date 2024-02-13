import { Alchemy, Network, Wallet } from "alchemy-sdk";

import { env } from "@/env.mjs";

export const getFaucetBalance = async (network: Network) => {
  const config = {
    apiKey:
      network === Network.BASE_SEPOLIA
        ? env.ALCHEMY_BASE_SEPOLIA_KEY
        : env.ALCHEMY_SEPOLIA_KEY,
    network: network,
  };

  const alchemy = new Alchemy(config);
  const wallet = new Wallet(env.FAUCET_PRIVATE_KEY, alchemy);
  return await wallet.getBalance();
};
