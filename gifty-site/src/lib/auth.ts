import { SignJWT, jwtVerify } from "jose";

function getSecret() {
  const secret = process.env.JWT_SECRET || "dev-secret";
  return new TextEncoder().encode(secret);
}

export async function signB2BToken() {
  return new SignJWT({ role: "b2b" })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(getSecret());
}

export async function verifyB2BToken(token: string) {
  const { payload } = await jwtVerify(token, getSecret());
  return payload;
}
