import { NextRequest, NextResponse } from "next/server";

export function DELETE(req: NextRequest) {

    console.log("logout", req.cookies)
    return NextResponse.json(
        {},
        {
          status: 200,
          headers: { "Set-Cookie": `token=; Path=/; HttpOnly` },
        }
      );
}