import {
  FrameRequest,
  getFrameHtmlResponse,
  getFrameMessage,
} from "@coinbase/onchainkit";
import { Alchemy, Network, Utils, Wallet } from "alchemy-sdk";
import { NextRequest, NextResponse } from "next/server";
import { isAddress } from "viem";

import { env } from "@/env.mjs";
import {
  frame_back_home,
  frame_claimed,
  frame_not_following,
} from "@/lib/frames";
import { getFaucetBalance } from "@/lib/get-faucet-balance";
import { getUser } from "@/lib/get-user";
import { supabase } from "@/lib/supabase-client";
import { validateFollows } from "@/lib/validate-follows";

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

  // Check if the user is following the required accounts
  const followingProfiles = await validateFollows(message.interactor.fid);

  if (!followingProfiles) {
    return new NextResponse(getFrameHtmlResponse(frame_not_following()));
  }

  // Chcek address format
  if (!isAddress(message.input)) {
    return new NextResponse(
      getFrameHtmlResponse(frame_back_home("🙅‍♂️ Wrong address format"))
    );
  }

  // Check if the user claimed in the last 24 hours
  const { data: user } = await supabase
    .from("Users")
    .select("claimed_at")
    .eq("id", message.interactor.fid)
    .single();

  if (user && user.claimed_at) {
    const claimedAt = new Date(user.claimed_at + "Z");
    const now = new Date();
    const diff = now.getTime() - claimedAt.getTime();
    if (diff < 24 * 60 * 60 * 1000) {
      return new NextResponse(
        getFrameHtmlResponse(
          frame_back_home("🙅‍♂️ You need to wait 24 hours until the next claim")
        )
      );
    }
  }

  // Check faucet balance
  const faucetBalance = await getFaucetBalance(
    message.button === 1 ? Network.BASE_SEPOLIA : Network.ETH_SEPOLIA
  );

  if (faucetBalance.lt(Utils.parseEther("0.11"))) {
    return new NextResponse(
      getFrameHtmlResponse(
        frame_back_home("🙅‍♂️ Not enough balance in the faucet")
      )
    );
  }

  await supabase.from("Users").upsert({
    id: message.interactor.fid,
    claimed_at: new Date().toISOString(),
  });

  const config = {
    apiKey:
      message.button === 1
        ? env.ALCHEMY_BASE_SEPOLIA_KEY
        : env.ALCHEMY_SEPOLIA_KEY,
    network: message.button === 1 ? Network.BASE_SEPOLIA : Network.ETH_SEPOLIA,
  };

  const alchemy = new Alchemy(config);
  const wallet = new Wallet(env.FAUCET_PRIVATE_KEY, alchemy);

  await wallet.sendTransaction({
    to: message.input,
    value: Utils.parseEther("0.1"),
  });

  let fid = 4964;
  let profileDisplayName = "Barto Molina";
  let profileName = "bartomolina";

  const { data: sponsor } = await supabase.rpc("get_random_sponsor");
  if (sponsor) {
    const sponsorDetails = await getUser(sponsor.fid);
    if (sponsorDetails && sponsorDetails.Socials.Social) {
      await supabase
        .from("Users")
        .update({
          credits: sponsor.adcredits - 1,
          visualizations: sponsor.totalvisualizations + 1,
        })
        .eq("id", sponsor.fid);

      fid = sponsor.fid;
      profileDisplayName = sponsorDetails.Socials.Social[0].profileDisplayName;
      profileName = sponsorDetails.Socials.Social[0].profileName;
    }
  }

  return new NextResponse(
    getFrameHtmlResponse(frame_claimed(fid, profileDisplayName, profileName))
  );
}

export async function POST(req: NextRequest): Promise<Response> {
  return getResponse(req);
}

export const dynamic = "force-dynamic";
