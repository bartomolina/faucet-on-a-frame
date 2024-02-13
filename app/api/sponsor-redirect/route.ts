import { NextRequest, NextResponse } from "next/server";

import { supabase } from "@/lib/supabase-client";

async function getResponse(req: NextRequest): Promise<NextResponse> {
  const url = new URL(req.url);
  const fid = url.searchParams.get("fid");
  const profileName = url.searchParams.get("profileName");

  const { data, error } = await supabase
    .from("Users")
    .select("visits")
    .eq("id", fid)
    .single();

  if (data && !error) {
    await supabase
      .from("Users")
      .update({ visits: data.visits + 1 })
      .eq("id", fid);
  }

  return NextResponse.redirect(`https://warpcast.com/${profileName}`, {
    status: 302,
  });
}

export async function POST(req: NextRequest): Promise<Response> {
  return getResponse(req);
}

export const dynamic = "force-dynamic";
