import { PrismaClient } from "@prisma/client";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request, response) {
  try {
    const headerList = headers();
    const id = parseInt(headerList.get("id"));

    const requestBody = await request.json();

    const prisma = new PrismaClient();
    const result = await prisma.product_wishes.create({ data: { product_id: requestBody["product_id"], user_id: id } });

    return NextResponse.json({ status: "success", data: result });
  } catch (error) {
    return NextResponse.json({ status: "fail", data: error });
  }
}

export async function DELETE(request, response) {
  try {
    const headerList = headers();
    const id = parseInt(headerList.get("id"));

    const requestBody = await request.json();

    const prisma = new PrismaClient();
    const result = await prisma.product_wishes.deleteMany({ where: { AND: [{ product_id: requestBody["product_id"] }, { user_id: id }] } });

    return NextResponse.json({ status: "success", data: result });
  } catch (error) {
    return NextResponse.json({ status: "fail", data: error });
  }
}

export async function GET(request, response) {
  try {
    const headerList = headers();
    const id = parseInt(headerList.get("id"));

    const prisma = new PrismaClient();
    const result = await prisma.product_wishes.findMany({ where: { user_id: id }, include: { products: true } });

    return NextResponse.json({ status: "success", data: result });
  } catch (error) {
    return NextResponse.json({ status: "fail", data: error });
  }
}
