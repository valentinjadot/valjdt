import { NextResponse } from "next/server";
import { threeDPoints } from "./three-d-points";
import { IPoint } from "@/types";

export const runtime = "nodejs";

export async function GET(_req: Request) {
  try {
    const points: IPoint[] = await threeDPoints();

    return NextResponse.json({ success: true, points });
  } catch (e) {
    console.log(e);
    return NextResponse.error();
  }
}
