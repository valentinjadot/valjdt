// pages/api/user.ts
import { NextResponse } from "next/server";
import prisma from "@/utils/prisma"; // Adjust this path to your Prisma client instance
import { User } from "@prisma/client";
import { geolocation, ipAddress } from "@vercel/edge";

export const runtime = "edge";

export async function POST(request: Request) {
  try {
    const { fingerprint } = await request.json();

    const geolocationData = geolocation(request);
    const ipData = ipAddress(request);

    const entropy = JSON.stringify({
      ipFromHeader: request.headers.get("X-Forwarded-For"),
      ipData,
      geolocationData,
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
