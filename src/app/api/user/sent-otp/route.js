import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import { SendEmail } from "@/utility/EmailUtility";

export async function GET(request, response) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get("email");

    const code = Math.floor(100000 + Math.random() * 900000).toString();
    const emailText = `Your OTP code is: ${code}`;
    const emailSubject = "Next Commerce OTP Code";

    await SendEmail(email, emailSubject, emailText);

    const prisma = new PrismaClient();
    const result = await prisma.users.upsert({ where: { email: email }, update: { otp: code }, create: { email: email, otp: code } });

    return NextResponse.json({ status: "success", data: result });
  } catch (error) {
    return NextResponse.json({ status: "fail", message: error });
  }
}
