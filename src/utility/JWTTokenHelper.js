import { SignJWT, jwtVerify } from "jose";

export async function CreateToken(id, email) {
  const secret = new TextEncoder().encode(process.env.JWT_SECRET);

  const payload = { id: id, email: email };

  const token = await new SignJWT(payload).setExpirationTime(process.env.JWT_EXPIRATION_TIME).setIssuedAt().setIssuer(process.env.JWT_ISSUER).setProtectedHeader({ alg: "HS256" }).sign(secret);

  return token;
}

export async function VerifyToken(token) {
  const secret = new TextEncoder().encode(process.env.JWT_SECRET);
  const decoded = await jwtVerify(token, secret);
  return decoded["payload"];
}
