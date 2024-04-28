import { CreateToken } from "@/utility/JWTTokenHelper";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

export async function POST(request, response) {
  try {
    const requestBody = await request.json();

    const prisma = new PrismaClient();
    const result = await prisma.users.findMany({ where: requestBody });

    if (result === 0) {
      return NextResponse.json({ status: "fail", data: "Invalid Verification Code" });
    } else {
      await prisma.users.update({ where: { email: requestBody["email"] }, data: { otp: "0" } });

      const token = await CreateToken(result[0].id, result[0].email);
      const expireDuration = new Date(Date.now() + 24 * 60 * 60 * 1000);
      const cookieString = `token=${token}; expires=${expireDuration}; path=/`;

      return NextResponse.json({ status: "success", data: token }, { status: 200, headers: { "set-cookie": cookieString } });
    }
  } catch (error) {
    return NextResponse.json({ status: "fail", data: error });
  }
}
