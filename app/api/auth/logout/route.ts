import { NextRequest, NextResponse } from "next/server";

export function DELETE(req: NextRequest) {
  return NextResponse.json(
    {},
    {
      status: 200,
      headers: {
        "Set-Cookie": `token=; Path=/; HttpOnly, adminAccess=; Path=/; HttpOnly, adminKey=; Path=/; HttpOnly`,
      },
    }
  );
}
