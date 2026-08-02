import { prisma } from "@/lib/db/prisma"
import { hashPassword, verifyPassword } from "@/lib/auth/password"
import { ensureUserCredit } from "@/services/credit/credit-service"

export async function signupWithEmail(email: string, password: string) {
  const existing = await prisma.user.findUnique({ where: { email } })
  if (existing) {
    throw new Error("이미 가입된 이메일입니다.")
  }

  const passwordHash = await hashPassword(password)
  const user = await prisma.user.create({
    data: {
      email,
      password_hash: passwordHash,
      role: "member",
      status: "active",
      email_verified: false,
    },
  })

  await ensureUserCredit(user.id)

  return user
}

export async function loginWithEmail(email: string, password: string) {
  const user = await prisma.user.findUnique({
    where: { email },
  })

  if (!user || user.deleted_at || user.status === "withdrawn") {
    throw new Error("회원 정보를 찾을 수 없습니다.")
  }

  if (user.status === "suspended") {
    throw new Error("정지된 계정입니다.")
  }

  const valid = await verifyPassword(password, user.password_hash)
  if (!valid) {
    throw new Error("이메일 또는 비밀번호가 올바르지 않습니다.")
  }

  await prisma.user.update({
    where: { id: user.id },
    data: { last_login_at: new Date() },
  })

  const credit = await ensureUserCredit(user.id)

  return { user, credit }
}

export async function changePassword(userId: string, currentPassword: string, nextPassword: string) {
  const user = await prisma.user.findUnique({ where: { id: userId } })
  if (!user) throw new Error("회원 정보를 찾을 수 없습니다.")

  const valid = await verifyPassword(currentPassword, user.password_hash)
  if (!valid) throw new Error("현재 비밀번호가 일치하지 않습니다.")

  const nextHash = await hashPassword(nextPassword)
  await prisma.user.update({
    where: { id: userId },
    data: {
      password_hash: nextHash,
      updated_at: new Date(),
    },
  })
}

export async function requestPasswordReset(email: string) {
  const user = await prisma.user.findUnique({ where: { email } })
  if (!user) return null

  const token = crypto.randomUUID()
  const expiresAt = new Date(Date.now() + 1000 * 60 * 30)

  await prisma.passwordResetToken.create({
    data: {
      user_id: user.id,
      token,
      expires_at: expiresAt,
    },
  })

  return { token, expiresAt }
}

export async function resetPasswordWithToken(token: string, nextPassword: string) {
  const resetToken = await prisma.passwordResetToken.findUnique({
    where: { token },
  })

  if (!resetToken || resetToken.used_at || resetToken.expires_at < new Date()) {
    throw new Error("유효하지 않거나 만료된 토큰입니다.")
  }

  const nextHash = await hashPassword(nextPassword)

  await prisma.$transaction([
    prisma.user.update({
      where: { id: resetToken.user_id },
      data: { password_hash: nextHash },
    }),
    prisma.passwordResetToken.update({
      where: { token },
      data: { used_at: new Date() },
    }),
  ])

  return { message: "비밀번호가 재설정되었습니다." }
}

export async function withdrawUser(userId: string) {
  await prisma.user.update({
    where: { id: userId },
    data: {
      status: "withdrawn",
      deleted_at: new Date(),
    },
  })
}

export async function updateProfile(userId: string, payload: { email?: string; role?: "member" | "verified" }) {
  return prisma.user.update({
    where: { id: userId },
    data: {
      email: payload.email,
      role: payload.role,
    },
  })
}
