import { SignJWT, jwtVerify } from "jose"
import type { SessionUser } from "@/types/auth"

const encoder = new TextEncoder()
const SESSION_EXPIRES_SECONDS = 60 * 60 * 24 * 7

function getSecret() {
  const value = process.env.JWT_SECRET
  if (!value) {
    throw new Error("JWT_SECRET is not set")
  }
  return encoder.encode(value)
}

export async function signSessionToken(user: SessionUser) {
  return new SignJWT({
    sub: user.id,
    email: user.email,
    role: user.role,
    status: user.status,
  })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${SESSION_EXPIRES_SECONDS}s`)
    .sign(getSecret())
}

export async function verifySessionToken(token: string) {
  const { payload } = await jwtVerify(token, getSecret())
  return payload as {
    sub: string
    email: string
    role: SessionUser["role"]
    status: SessionUser["status"]
  }
}
