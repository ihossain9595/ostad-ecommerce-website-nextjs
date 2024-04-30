import { NextResponse } from "next/server";

export async function GET(request, response) {
  let expireDuration = new Date(Date.now() - 24 * 60 * 60 * 1000);
  const cookieStrings = `token=' '; expires= ${expireDuration.toUTCString()}; path=/`;
  return NextResponse.json({ status: "success" }, { status: 200, headers: { "set-cookie": cookieStrings } });
}
