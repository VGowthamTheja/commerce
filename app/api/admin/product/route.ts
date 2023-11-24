import { db } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const adminAccess = req.cookies.get("adminAccess")?.value;

  if (adminAccess === "false") {
    return NextResponse.json(
      { error: "You are not authorized to access this page" },
      { status: 403 }
    );
  }

  const products = await db.product.findMany({});
  return NextResponse.json(products);
}

export async function POST(req: NextRequest) {
  const adminAccess = req.cookies.get("adminAccess")?.value;

  if (adminAccess === "false") {
    return NextResponse.json(
      { error: "You are not authorized to access this page" },
      { status: 403 }
    );
  }

  const { name, description, price, image, keywords, stockCount } =
    await req.json();

  const product = await db.product.create({
    data: {
      name,
      keywords,
      description,
      price,
      image,
    },
  });

  await db.inventory.upsert({
    where: { productId: product.id },
    create: {
      productId: product.id,
      quantity: stockCount,
    },
    update: {
      quantity: stockCount,
    },
  });

  return NextResponse.json(product);
}
