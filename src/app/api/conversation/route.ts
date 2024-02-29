// pages/api/user.ts
import { NextResponse } from "next/server";
import prisma from "@/utils/prisma"; // Adjust this path to your Prisma client instance
import { Prisma } from "@prisma/client";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const { data } = (await req.json()) as Prisma.ConversationCreateArgs;

    const conversation = await prisma.conversation.upsert({
      where: {
        uuid: data.uuid,
      },
      update: {},
      create: data,
    });

    return NextResponse.json({ success: true, conversation });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error }), {
      status: 500,
    });
  }
}
