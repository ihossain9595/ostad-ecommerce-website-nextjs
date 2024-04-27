import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

export async function GET(request, response) {
  try {
    const { searchParams } = new URL(request.url);
    const remark = searchParams.get("remark");

    const prisma = new PrismaClient();
    const result = await prisma.products.findMany({ where: { remark: remark } });
    return NextResponse.json({ status: "success", data: result });
  } catch (error) {
    return NextResponse.json({ status: "fail", message: error });
  }
}
