// pages/api/user.ts
import { NextResponse } from "next/server";
import prisma from "@/utils/prisma"; // Adjust this path to your Prisma client instance
import { User } from "@prisma/client";
import { geolocation, ipAddress } from "@vercel/edge";
import { cookies } from "next/headers";
import { headers } from "next/headers";

export const runtime = "edge";

export async function POST(request: Request) {
  try {
    const cookieStore = cookies();

    const fingerprint =
      getFinterprintFromCookie() ?? (await getFinterprintFromRequest(request));

    cookieStore.set("fingerprint", fingerprint);

    const headersList = headers();

    const entropy = JSON.stringify({
      headersList,
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

const getFinterprintFromRequest = async (request: Request): Promise<string> => {
  const { fingerprint } = await request.json();
  return fingerprint;
};
const getFinterprintFromCookie = () => {
  const cookieStore = cookies();
  return cookieStore.get("fingerprint")?.value;
};
