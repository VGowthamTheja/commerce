import { db } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  const sessionId = req.cookies.get("sessionId")?.value;

  if (!token) {
    return NextResponse.next();
  }

  const userSession = await db.session.findUnique({
    where: { id: sessionId },
  });

  if (!userSession) {
    return NextResponse.json({ message: "Invalid session" }, { status: 401 });
  }

  const profile = await db.userProfile.findUnique({
    where: { userId: userSession.userId },
  });

  return NextResponse.json({ profile }, { status: 200 });
}
