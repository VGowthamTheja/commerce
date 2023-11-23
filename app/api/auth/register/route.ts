import { db } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();
  const registerSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
  });

  try {
    const schemaParse = registerSchema.safeParse({ email, password });

    if (!schemaParse.success) {
      return NextResponse.json(
        { error: JSON.parse(schemaParse.error.message) },
        { status: 400 }
      );
    }

    const user = await db.user.create({
      data: {
        email,
        password,
      },
    });

    return NextResponse.json(
      {},
      {
        status: 201,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    return new Response(JSON.stringify({ error: error }), {
      status: 400,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
