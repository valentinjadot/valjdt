import { NextResponse } from "next/server";
import seed from "./seed";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const information = formData.get("information") as string;

    seed(information);

    return NextResponse.json({ success: true });
  } catch (e) {
    console.log(e);
    return NextResponse.error();
  }
}
