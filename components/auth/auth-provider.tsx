"use client"

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react"
import type { AppRole } from "@/types/auth"

type AuthProfile = {
  id: string
  email: string
  role: AppRole
  status: "active" | "suspended" | "withdrawn"
  aiCredits: number
  totalCredits: number
  unlimitedUntil: string | null
  referralsCompleted: number
  referralCode?: string
  profileStep: number
  verificationStatus: "unverified" | "pending" | "verified" | "rejected"
  rejectedReason: string | null
}

type AuthContextValue = {
  isReady: boolean
  profile: AuthProfile
  signup: (email: string, password: string) => Promise<boolean>
  login: (email: string, password: string) => Promise<boolean>
  logout: () => Promise<void>
  verifyBusiness: (payload: {
    businessNumber: string
    companyName: string
    representative?: string
    certificateUrl?: string
  }) => Promise<boolean>
  consumeAiCredit: (answer?: { key: string; value: string }) => Promise<boolean>
  completeReferral: () => Promise<boolean>
  refreshMe: () => Promise<void>
}

const defaultProfile: AuthProfile = {
  id: "",
  email: "",
  role: "guest",
  status: "active",
  aiCredits: 0,
  totalCredits: 0,
  unlimitedUntil: null,
  referralsCompleted: 0,
  profileStep: 0,
  verificationStatus: "unverified",
  rejectedReason: null,
}

const AuthContext = createContext<AuthContextValue | null>(null)

async function parseJson(response: Response) {
  const data = await response.json().catch(() => ({}))
  if (!response.ok) {
    throw new Error(typeof data.message === "string" ? data.message : "요청 실패")
  }
  return data
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isReady, setIsReady] = useState(false)
  const [profile, setProfile] = useState<AuthProfile>(defaultProfile)

  const refreshMe = useCallback(async () => {
    try {
      const response = await fetch("/api/auth/me", { cache: "no-store" })
      if (!response.ok) {
        setProfile(defaultProfile)
        return
      }
      const data = await response.json()
      const referralsRes = await fetch("/api/referrals/me", { cache: "no-store" })
      const referralData = referralsRes.ok ? await referralsRes.json() : { completed: 0, code: null }

      setProfile({
        id: data.user.id,
        email: data.user.email,
        role: data.user.role,
        status: data.user.status,
        aiCredits: data.credits?.remaining ?? 0,
        totalCredits: data.credits?.total ?? 0,
        unlimitedUntil: data.credits?.unlimitedUntil ?? null,
        referralsCompleted: referralData.completed ?? 0,
        referralCode: referralData.code ?? undefined,
        profileStep: Number(data.user.profileStep ?? 0),
        verificationStatus: data.user.verificationStatus ?? "unverified",
        rejectedReason: data.user.rejectedReason ?? null,
      })
    } finally {
      setIsReady(true)
    }
  }, [])

  useEffect(() => {
    void refreshMe()
  }, [refreshMe])

  const signup = useCallback(async (email: string, password: string) => {
    const response = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    })
    await parseJson(response)
    await refreshMe()
    return true
  }, [refreshMe])

  const login = useCallback(async (email: string, password: string) => {
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    })
    await parseJson(response)
    await refreshMe()
    return true
  }, [refreshMe])

  const logout = useCallback(async () => {
    await fetch("/api/auth/logout", { method: "POST" })
    setProfile(defaultProfile)
  }, [])

  const verifyBusiness = useCallback(async (payload: {
    businessNumber: string
    companyName: string
    representative?: string
    certificateUrl?: string
  }) => {
    const response = await fetch("/api/business/verify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
    await parseJson(response)
    await refreshMe()
    return true
  }, [refreshMe])

  const consumeAiCredit = useCallback(async (answer?: { key: string; value: string }) => {
    const response = await fetch("/api/credits/consume", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(answer ?? {}),
    })
    await parseJson(response)
    await refreshMe()
    return true
  }, [refreshMe])

  const completeReferral = useCallback(async () => {
    const response = await fetch("/api/referrals/complete-demo", { method: "POST" })
    await parseJson(response)
    await refreshMe()
    return true
  }, [refreshMe])

  const value = useMemo<AuthContextValue>(
    () => ({
      isReady,
      profile,
      signup,
      login,
      logout,
      verifyBusiness,
      consumeAiCredit,
      completeReferral,
      refreshMe,
    }),
    [isReady, profile, signup, login, logout, verifyBusiness, consumeAiCredit, completeReferral, refreshMe]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuthSession() {
  const context = useContext(AuthContext)
  if (!context) throw new Error("useAuthSession must be used inside AuthProvider")
  return context
}
