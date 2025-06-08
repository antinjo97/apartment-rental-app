"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"
import type { User } from "@supabase/supabase-js"

interface AuthContextType {
  user: User | null
  isAdmin: boolean
  isSuperAdmin: boolean
  loading: boolean
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isAdmin: false,
  isSuperAdmin: false,
  loading: true,
  signOut: async () => {},
})

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isAdmin, setIsAdmin] = useState(false)
  const [isSuperAdmin, setIsSuperAdmin] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Get initial session
    const getInitialSession = async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession()
        if (session?.user) {
          setUser(session.user)
          await checkUserRole(session.user.email!)
        }
      } catch (error) {
        console.error("Error getting initial session:", error)
      } finally {
        setLoading(false)
      }
    }

    getInitialSession()

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log("Auth state changed:", event, session?.user?.email)

      if (session?.user) {
        setUser(session.user)
        await checkUserRole(session.user.email!)
      } else {
        setUser(null)
        setIsAdmin(false)
        setIsSuperAdmin(false)
      }
      setLoading(false)
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  const checkUserRole = async (email: string) => {
    try {
      console.log("Checking user role for:", email)

      // Check if super admin
      if (email === "ante@admin.hr") {
        console.log("User is super admin")
        setIsSuperAdmin(true)
        setIsAdmin(true)
        return
      }

      // Check if regular admin (apartment owner)
      const { data: adminData, error: adminError } = await supabase
        .from("users")
        .select("role")
        .eq("email", email)
        .single()

      if (adminError) {
        console.log("No user role found, checking auth.users table")
        // Fallback: check auth.users metadata
        const { data: authUser } = await supabase.auth.getUser()
        const userRole = authUser.user?.user_metadata?.role || "user"

        setIsAdmin(userRole === "admin")
        setIsSuperAdmin(false)
        return
      }

      console.log("User role from database:", adminData?.role)
      setIsAdmin(adminData?.role === "admin")
      setIsSuperAdmin(false)
    } catch (error) {
      console.error("Error checking user role:", error)
      setIsAdmin(false)
      setIsSuperAdmin(false)
    }
  }

  const signOut = async () => {
    try {
      console.log("Signing out user...")
      const { error } = await supabase.auth.signOut()
      if (error) {
        console.error("Sign out error:", error)
        throw error
      }

      // Clear state immediately
      setUser(null)
      setIsAdmin(false)
      setIsSuperAdmin(false)

      console.log("User signed out successfully")
    } catch (error) {
      console.error("Error during sign out:", error)
      throw error
    }
  }

  return (
    <AuthContext.Provider value={{ user, isAdmin, isSuperAdmin, loading, signOut }}>{children}</AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
