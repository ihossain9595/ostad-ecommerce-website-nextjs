import { PrismaClient } from "@prisma/client";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request, response) {
  try {
    const { searchParams } = new URL(request.url);
    const tran_id = searchParams.get("tran_id");

    const requestBody = await request.json();

    const prisma = new PrismaClient();
    const result = await prisma.invoices.updateMany({ where: { AND: [{ tran_id: tran_id }] }, data: { payment_status: requestBody["status"] } });

    return NextResponse.json({ status: "success", data: result });
  } catch (error) {
    return NextResponse.json({ status: "fail", data: error });
  }
}
