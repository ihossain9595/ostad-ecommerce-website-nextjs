import { PrismaClient } from "@prisma/client";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request, response) {
  try {
    const headerList = headers();
    const id = parseInt(headerList.get("id"));

    const prisma = new PrismaClient();

    const customer = await prisma.customer_profiles.findUnique({ where: { user_id: 1 } });
    const customerID = customer["id"];

    const requestBody = await request.json();
    requestBody.customer_id = customerID;

    const result = await prisma.product_reviews.create({ data: requestBody });

    return NextResponse.json({ status: "success", data: result });
  } catch (error) {
    return NextResponse.json({ status: "fail", message: error });
  }
}
