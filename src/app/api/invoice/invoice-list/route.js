import { PrismaClient } from "@prisma/client";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(request, response) {
  try {
    const headerList = headers();
    const id = parseInt(headerList.get("id"));

    const prisma = new PrismaClient();
    const result = await prisma.invoices.findMany({ where: { user_id: id } });

    return NextResponse.json({ status: "success", data: result });
  } catch (error) {
    return NextResponse.json({ status: "fail", data: error });
  }
}
