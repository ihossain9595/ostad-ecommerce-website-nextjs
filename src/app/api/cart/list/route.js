import { PrismaClient } from "@prisma/client";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request, response) {
  try {
    const headerList = headers();
    const id = parseInt(headerList.get("id"));

    const requestBody = await request.json();
    requestBody.user_id = id;

    const prisma = new PrismaClient();
    const result = await prisma.product_carts.create({ data: requestBody });

    return NextResponse.json({ status: "success", data: result });
  } catch (error) {
    return NextResponse.json({ status: "fail", data: error });
  }
}

export async function PUT(request, response) {
  try {
    const headerList = headers();
    const user_id = parseInt(headerList.get("id"));

    const requestBody = await request.json();

    const prisma = new PrismaClient();
    const result = await prisma.product_carts.updateMany({ where: { AND: [{ id: requestBody["id"] }, { user_id: user_id }] }, data: { color: requestBody["color"], size: requestBody["size"], qty: requestBody["qty"] } });

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
    const result = await prisma.product_carts.deleteMany({ where: { AND: [{ product_id: requestBody["product_id"] }, { user_id: id }] } });

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
    const result = await prisma.product_carts.findMany({ where: { user_id: id }, include: { products: true } });

    return NextResponse.json({ status: "success", data: result });
  } catch (error) {
    return NextResponse.json({ status: "fail", data: error });
  }
}
