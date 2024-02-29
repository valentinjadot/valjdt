// pages/api/user.ts
import { NextResponse } from "next/server";
import prisma from "@/utils/prisma"; // Adjust this path to your Prisma client instance
import { User } from "@prisma/client";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const { fingerprint } = await req.json();

    // Find or create user
    const user: User = await prisma.user.upsert({
      where: { fingerprint },
      update: {},
      create: {
        fingerprint,
      },
    });

    return NextResponse.json({ success: true, user });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error }), {
      status: 500,
    });
  }
}
