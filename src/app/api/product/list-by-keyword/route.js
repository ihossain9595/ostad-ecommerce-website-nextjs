import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

export async function GET(request, response) {
  try {
    const { searchParams } = new URL(request.url);
    const keyword = searchParams.get("keyword");

    const prisma = new PrismaClient();
    const result = await prisma.products.findMany({ where: { title: { contains: keyword } } });
    return NextResponse.json({ status: "success", data: result });
  } catch (error) {
    return NextResponse.json({ status: "fail", message: error });
  }
}
