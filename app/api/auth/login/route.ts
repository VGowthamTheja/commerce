import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { db } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();

  let user = await db.user.findUnique({
    where: { email },
  });

  if (!user) {
    return NextResponse.json({ message: "User not found" }, { status: 404 });
  }

  const passwordMatch = await bcrypt.compare(password, user.password);

  if (!passwordMatch) {
    return Response.json({
      status: 401,
      body: { message: "Invalid credentials" },
    });
  }

  const token = jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    process.env.AUTH_SECRET!,
    { expiresIn: "1h" }
  );

  return NextResponse.json(
    {},
    {
      status: 200,
      headers: { "Set-Cookie": `token=${token}; Path=/; HttpOnly` },
    }
  );
}
