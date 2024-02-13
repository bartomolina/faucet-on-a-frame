import {
  FrameRequest,
  getFrameHtmlResponse,
  getFrameMessage,
} from "@coinbase/onchainkit";
import { Network, Utils } from "alchemy-sdk";
import { NextRequest, NextResponse } from "next/server";

import { frame_back_home, frame_claim, frame_sponsor } from "@/lib/frames";
import { getFaucetBalance } from "@/lib/get-faucet-balance";
import { supabase } from "@/lib/supabase-client";

async function getResponse(req: NextRequest): Promise<NextResponse> {
  const body: FrameRequest = await req.json();

  const { isValid, message } = await getFrameMessage(body, {
    neynarApiKey: "NEYNAR_ONCHAIN_KIT",
  });

  if (!isValid || !message) {
    return new NextResponse(
      getFrameHtmlResponse(frame_back_home("🙅‍♂️ Error validating the request"))
    );
  }

  // Claim
  if (message.button === 1) {
    // Faucet balance in Base
    const balanceBase = await getFaucetBalance(Network.BASE_SEPOLIA);
    const remainderBase = balanceBase.mod(1e14);

    // Faucet balance in Ethereum
    const balanceEthereum = await getFaucetBalance(Network.ETH_SEPOLIA);
    const remainderEthereum = balanceEthereum.mod(1e14);

    return new NextResponse(
      getFrameHtmlResponse(
        frame_claim(
          Utils.formatEther(balanceBase.sub(remainderBase)),
          Utils.formatEther(balanceEthereum.sub(remainderEthereum))
        )
      )
    );
  }

  // Sponsor
  else {
    const { data } = await supabase
      .from("Users")
      .select("credits, visualizations, visits")
      .eq("id", message.interactor.fid)
      .single();

    const credits = data?.credits || 0;
    const visualizations = data?.visualizations || 0;
    const visits = data?.visits || 0;
    return new NextResponse(
      getFrameHtmlResponse(frame_sponsor(credits, visualizations, visits))
    );
  }
}

export async function POST(req: NextRequest): Promise<Response> {
  return getResponse(req);
}

export const dynamic = "force-dynamic";
