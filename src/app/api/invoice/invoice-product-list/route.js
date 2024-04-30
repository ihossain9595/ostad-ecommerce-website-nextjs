import { PrismaClient } from "@prisma/client";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request, response) {
  try {
    const headerList = headers();
    const id = parseInt(headerList.get("id"));

    const requestBody = await request.json();

    const prisma = new PrismaClient();
    const result = await prisma.invoice_products.findMany({
      where: { AND: [{ invoice_id: requestBody["invoice_id"] }, { user_id: id }] },
      include: {
        products: true,
      },
    });

    return NextResponse.json({ status: "success", data: result });
  } catch (error) {
    return NextResponse.json({ status: "fail", data: error });
  }
}
