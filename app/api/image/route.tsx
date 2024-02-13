// @ts-nocheck
import { ImageResponse, NextRequest } from "next/server";

import { env } from "@/env.mjs";

export const runtime = "edge";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const body = searchParams.get("body");

  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 25,
          color: "white",
          background: "linear-gradient(to right, #3447f0, #ffffff)",
          backgroundSize: "130% 100%",
          width: "100%",
          height: "100%",
          padding: "25px 30px",
          display: "flex",
        }}
      >
        <div
          style={{
            paddingRight: "160px",
          }}
        >
          {body}
        </div>
        <img
          src={`${env.NEXT_PUBLIC_URL}/alchemy-logo.png`}
          alt="Alchemy"
          style={{
            position: "absolute",
            bottom: 165,
            right: 15,
            width: "150px",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: 210,
            right: 103,
            color: "black",
            fontSize: "10px",
          }}
        >
          Powered by:
        </div>
        <img
          src={`${env.NEXT_PUBLIC_URL}/airstack-logo.png`}
          alt="Airstack"
          style={{
            position: "absolute",
            bottom: 105,
            right: 15,
            width: "150px",
          }}
        />
        <img
          src={`${env.NEXT_PUBLIC_URL}/base-logo.png`}
          alt="Base"
          style={{
            position: "absolute",
            bottom: 55,
            right: 15,
            width: "150px",
          }}
        />
      </div>
    ),
    {
      width: 640,
      height: 335,
    }
  );
}
