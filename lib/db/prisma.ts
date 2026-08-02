import { PrismaClient } from "@prisma/client"

declare global {
  var __prisma__: PrismaClient | undefined
}

const defaultSqliteUrl = "file:./prisma/dev.db"
const databaseUrl = process.env.DATABASE_URL?.trim()

const resolvedDatabaseUrl =
  databaseUrl && databaseUrl.startsWith("file:") ? databaseUrl : defaultSqliteUrl

export const prisma =
  global.__prisma__ ??
  new PrismaClient({
    datasources: {
      db: {
        url: resolvedDatabaseUrl,
      },
    },
    log: process.env.NODE_ENV === "development" ? ["warn", "error"] : ["error"],
  })

if (process.env.NODE_ENV !== "production") {
  global.__prisma__ = prisma
}
