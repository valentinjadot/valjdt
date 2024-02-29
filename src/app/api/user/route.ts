// pages/api/user.ts
import { NextResponse } from "next/server";
import prisma from "@/utils/prisma"; // Adjust this path to your Prisma client instance

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const { fingerprint } = await req.json();

    // Find or create user
    const user = await prisma.user.upsert({
      where: { fingerprint },
      update: {},
      create: {
        fingerprint,
      },
    });

    return NextResponse.json({ success: true, user });
  } catch (e) {
    console.error(e);
    return new Response(JSON.stringify({ error: "An error occurred" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
