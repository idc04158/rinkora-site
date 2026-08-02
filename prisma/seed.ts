import "dotenv/config"
import { PrismaClient } from "@prisma/client"
import bcrypt from "bcryptjs"

const prisma = new PrismaClient()

async function main() {
  const email = process.env.ADMIN_EMAIL
  const password = process.env.ADMIN_PASSWORD

  if (!email || !password) {
    throw new Error("ADMIN_EMAIL and ADMIN_PASSWORD must be set in .env")
  }

  const existing = await prisma.user.findUnique({
    where: { email },
    select: { id: true },
  })

  if (existing) return

  const passwordHash = await bcrypt.hash(password, 10)

  const admin = await prisma.user.create({
    data: {
      email,
      password_hash: passwordHash,
      role: "admin",
      status: "active",
      email_verified: true,
      email_verified_at: new Date(),
    },
  })

  await prisma.credit.create({
    data: {
      user_id: admin.id,
      remaining: 0,
      total: 0,
    },
  })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (error) => {
    console.error(error)
    await prisma.$disconnect()
    process.exit(1)
  })
