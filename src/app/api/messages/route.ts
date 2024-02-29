// pages/api/user.ts
import { NextResponse } from "next/server";
import prisma from "@/utils/prisma"; // Adjust this path to your Prisma client instance
import { Prisma } from "@prisma/client";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const messages = (await req.json()) as Prisma.MessageCreateManyArgs;

    const result = await prisma.message.createMany({
      data: messages.data,
      skipDuplicates: true,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error }), {
      status: 500,
    });
  }
}
