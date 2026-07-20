export type AppRole = "guest" | "member" | "verified" | "admin"

export type SessionUser = {
  id: string
  email: string
  role: AppRole
  status: "active" | "suspended" | "withdrawn"
}

export type AuthResponse = {
  user: SessionUser
  credits: {
    remaining: number
    total: number
    unlimitedUntil: string | null
  } | null
}
