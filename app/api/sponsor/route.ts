import {
  FrameRequest,
  getFrameHtmlResponse,
  getFrameMessage,
} from "@coinbase/onchainkit";
import { Alchemy, Network, Utils } from "alchemy-sdk";
import { NextRequest, NextResponse } from "next/server";

import { env } from "@/env.mjs";
import { frame_back_home } from "@/lib/frames";
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

  let tx;
  let validTx = false;
  let newCredits = 0;

  // Sponsoring Base
  if (message.button === 1) {
    const config = {
      apiKey: env.ALCHEMY_BASE_SEPOLIA_KEY,
      network: Network.BASE_SEPOLIA,
    };
    const alchemy = new Alchemy(config);

    tx = await alchemy.transact.getTransaction(message.input);
  }

  // Sponsoring Ethereum
  if (message.button === 2) {
    const config = {
      apiKey: env.ALCHEMY_SEPOLIA_KEY,
      network: Network.ETH_SEPOLIA,
    };
    const alchemy = new Alchemy(config);

    tx = await alchemy.transact.getTransaction(message.input);
  }

  if (tx && tx.value) {
    // Check Sender
    if (
      tx.from.toLowerCase() !==
        message.interactor.verified_accounts[0].toLocaleLowerCase() ||
      tx.to?.toLowerCase() !== env.FAUCET_ADDRESS.toLowerCase()
    ) {
      return new NextResponse(
        getFrameHtmlResponse(frame_back_home("🙅‍♂️ Wrong sender / recipient"))
      );
    }

    // Check if the tx has been already processed
    const { data: existingTx } = await supabase
      .from("Transactions")
      .select("*")
      .eq("id", tx.hash)
      .single();

    if (existingTx) {
      return new NextResponse(
        getFrameHtmlResponse(
          frame_back_home("🙅‍♂️ The transaction has been already processed")
        )
      );
    }

    // Add credits
    const credits = Math.floor(
      tx.value.div(Utils.parseEther("0.2")).toNumber()
    );

    if (credits) {
      // Register transaction
      await supabase.from("Transactions").insert({
        id: tx.hash,
      });

      // Update credits
      const { data: userData } = await supabase
        .from("Users")
        .select("credits")
        .eq("id", message.interactor.fid)
        .single();

      const existingCredits = userData ? userData.credits : 0;
      newCredits = existingCredits + credits;

      await supabase.from("Users").upsert({
        id: message.interactor.fid,
        credits: newCredits,
      });

      validTx = true;
    }
  }

  return validTx
    ? new NextResponse(
        getFrameHtmlResponse(
          frame_back_home(
            `🙏 Thanks for your support!%0D%0D🪙 Ads credits: ${newCredits}`
          )
        )
      )
    : new NextResponse(
        getFrameHtmlResponse(frame_back_home("🙅‍♂️ Invalid transaction"))
      );
}

export async function POST(req: NextRequest): Promise<Response> {
  return getResponse(req);
}

export const dynamic = "force-dynamic";
