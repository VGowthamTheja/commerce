import { db } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { adminKey } = await req.json();

  const cookies = req.cookies;

  if (!(cookies.get("adminKey")?.value === "true")) {
    return NextResponse.json({ message: "Not authorized" }, { status: 401 });
  }

  const sessionId = cookies.get("sessionId")?.value;

  const session = await db.session.findUnique({
    where: { id: sessionId },
  });

  if (!session) {
    return NextResponse.json({ message: "Invalid session" }, { status: 401 });
  }

  const userProfile = await db.userProfile.findUnique({
    where: { userId: session.userId },
  });

  console.log({ userProfile, userId: session.userId });

  if (!userProfile) {
    return NextResponse.json({ message: "Invalid user" }, { status: 401 });
  }

  if (userProfile.adminKey !== adminKey) {
    return NextResponse.json({ message: "Invalid admin key" }, { status: 401 });
  }

  return NextResponse.json(
    {},
    {
      status: 200,
      headers: { "Set-Cookie": `adminAccess=true; HttpOnly; Path=/` },
    }
  );
}
