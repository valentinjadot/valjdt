import type { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";
import { threeDPoints } from "./three-d-points";

export const runtime = "nodejs";

export async function GET(_req: Request) {
  try {
    const points = await threeDPoints();

    return NextResponse.json({ success: true, points });
  } catch (e) {
    console.log(e);
    return NextResponse.error();
  }
}
