import { NextResponse } from "next/server";
import { VerifyToken } from "./utility/JWTTokenHelper";

export async function middleware(request, response) {
  try {
    const token = request.cookies.get("token");
    const payload = await VerifyToken(token["value"]);

    const requestHeader = new Headers(request.headers);
    requestHeader.set("email", payload["email"]);
    requestHeader.set("id", payload["id"]);

    return NextResponse.next({ request: { headers: requestHeader } });
  } catch (error) {
    if (request.url.startsWith("/api/")) {
      return NextResponse.json({ status: "fail", data: "Unauthorized" }, { status: 401 });
    } else {
      return request.redirect("/login");
    }
  }
}

export const config = {
  matcher: ["/api/cart/:path*", "/api/invoice/:path*", "/api/user/profile", "/api/wish/:path*"],
};
