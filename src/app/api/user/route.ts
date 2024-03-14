// pages/api/user.ts
import { NextResponse } from "next/server";
import prisma from "@/utils/prisma"; // Adjust this path to your Prisma client instance
import { User } from "@prisma/client";
import { geolocation, ipAddress } from "@vercel/edge";

export const runtime = "edge";

export async function POST(request: Request) {
  try {
    const { fingerprint } = await request.json();

    const entropy = JSON.stringify({
      request,
      ip: ipAddress(request),
      geolocation: geolocation(request),
    });

    // Find or create user
    const user: User = await prisma.user.upsert({
      where: { fingerprint },
      update: {
        entropy,
      },
      create: {
        fingerprint,
        entropy,
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
