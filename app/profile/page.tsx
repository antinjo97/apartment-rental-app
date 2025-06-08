"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useAuth } from "@/components/auth-provider"
import { useLanguage } from "@/components/language-provider"
import { useToast } from "@/hooks/use-toast"
import { getReservationsByUserId } from "@/lib/reservations"
import { signOut, updatePassword, getUserProfile } from "@/lib/auth"
import { User, Settings, Calendar, LogOut, Crown } from "lucide-react"
import type { Reservation } from "@/lib/supabase"

export default function ProfilePage() {
  const { user, loading } = useAuth()
  const { t } = useLanguage()
  const router = useRouter()
  const { toast } = useToast()
  const [reservations, setReservations] = useState<Reservation[]>([])
  const [loadingReservations, setLoadingReservations] = useState(true)
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [passwordError, setPasswordError] = useState("")
  const [updatingPassword, setUpdatingPassword] = useState(false)
  const [userProfile, setUserProfile] = useState<any>(null)

  useEffect(() => {
    if (!loading && !user) {
      router.push("/auth/signin")
    }
  }, [user, loading, router])

  useEffect(() => {
    async function fetchUserData() {
      if (user) {
        try {
          // Fetch user profile
          const profile = await getUserProfile(user.id)
          setUserProfile(profile)

          // Fetch user reservations
          const data = await getReservationsByUserId(user.id)
          setReservations(data)
        } catch (error) {
          console.error("Error fetching user data:", error)
        } finally {
          setLoadingReservations(false)
        }
      }
    }

    if (user) {
      fetchUserData()
    }
  }, [user])

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault()
    setPasswordError("")
    setUpdatingPassword(true)

    if (password !== confirmPassword) {
      setPasswordError(t("passwords_dont_match", "Passwords don't match"))
      setUpdatingPassword(false)
      return
    }

    if (password.length < 6) {
      setPasswordError(t("password_too_short", "Password must be at least 6 characters long"))
      setUpdatingPassword(false)
      return
    }

    try {
      await updatePassword(password)

      toast({
        title: t("success", "Success"),
        description: t("password_updated", "Your password has been updated successfully"),
      })

      setPassword("")
      setConfirmPassword("")
    } catch (error: any) {
      console.error("Error changing password:", error)
      toast({
        title: t("error", "Error"),
        description: error.message || t("password_update_error", "There was an error updating your password"),
        variant: "destructive",
      })
    } finally {
      setUpdatingPassword(false)
    }
  }

  const handleSignOut = async () => {
    try {
      await signOut()
      router.push("/")
    } catch (error) {
      console.error("Error signing out:", error)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-amber-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  const isAdmin = userProfile?.role === "admin"
  const isSuperAdmin = userProfile?.role === "super_admin"

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-amber-50">
      <div className="container mx-auto px-4 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{t("my_profile", "My Profile")}</h1>
          <p className="text-gray-600">{t("manage_account", "Manage your account and view your reservations")}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Profile Sidebar */}
          <div className="lg:col-span-1">
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg sticky top-8">
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center mb-6">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-r from-blue-600 to-teal-600 flex items-center justify-center text-white text-3xl font-bold mb-4 relative">
                    {user.email?.charAt(0).toUpperCase()}
                    {isSuperAdmin && (
                      <Crown className="absolute -top-2 -right-2 w-6 h-6 text-yellow-500 bg-white rounded-full p-1" />
                    )}
                  </div>
                  <h2 className="text-xl font-semibold text-gray-900">{user.email}</h2>
                  <div className="flex items-center gap-2 mt-1">
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${
                        isSuperAdmin
                          ? "bg-yellow-100 text-yellow-800"
                          : isAdmin
                            ? "bg-blue-100 text-blue-800"
                            : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {isSuperAdmin
                        ? t("super_admin", "Super Admin")
                        : isAdmin
                          ? t("admin", "Admin")
                          : t("user", "User")}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mt-2">{t("member_since", "Member since")} 2024</p>
                </div>

                <div className="space-y-2">
                  {(isAdmin || isSuperAdmin) && (
                    <Button variant="outline" className="w-full justify-start" onClick={() => router.push("/admin")}>
                      <Settings className="mr-2 h-4 w-4" />
                      {t("admin_panel", "Admin Panel")}
                    </Button>
                  )}
                  <Button variant="outline" className="w-full justify-start" onClick={() => handleSignOut()}>
                    <LogOut className="mr-2 h-4 w-4" />
                    {t("sign_out", "Sign Out")}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <Tabs defaultValue="account" className="space-y-6">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="account" className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  {t("account", "Account")}
                </TabsTrigger>
                <TabsTrigger value="reservations" className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  {t("my_reservations", "My Reservations")}
                </TabsTrigger>
              </TabsList>

              <TabsContent value="account">
                <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Settings className="w-5 h-5" />
                      {t("account_settings", "Account Settings")}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="email">{t("email", "Email")}</Label>
                      <Input id="email" value={user.email || ""} disabled />
                      <p className="text-xs text-gray-500">
                        {t("email_cannot_change", "Email address cannot be changed")}
                      </p>
                    </div>

                    <form onSubmit={handlePasswordChange} className="space-y-4 pt-4 border-t">
                      <h3 className="text-lg font-semibold">{t("change_password", "Change Password")}</h3>

                      {passwordError && (
                        <Alert variant="destructive">
                          <AlertDescription>{passwordError}</AlertDescription>
                        </Alert>
                      )}

                      <div className="space-y-2">
                        <Label htmlFor="password">{t("new_password", "New Password")}</Label>
                        <Input
                          id="password"
                          type="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="••••••••"
                          disabled={updatingPassword}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="confirmPassword">{t("confirm_password", "Confirm Password")}</Label>
                        <Input
                          id="confirmPassword"
                          type="password"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          placeholder="••••••••"
                          disabled={updatingPassword}
                        />
                      </div>

                      <Button
                        type="submit"
                        className="bg-gradient-to-r from-blue-600 to-teal-600"
                        disabled={updatingPassword}
                      >
                        {updatingPassword ? t("updating", "Updating...") : t("update_password", "Update Password")}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="reservations">
                <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Calendar className="w-5 h-5" />
                      {t("my_reservations", "My Reservations")}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {loadingReservations ? (
                      <div className="py-8 text-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                        <p className="mt-4 text-gray-600">{t("loading", "Loading...")}</p>
                      </div>
                    ) : reservations.length > 0 ? (
                      <div className="space-y-4">
                        {reservations.map((reservation) => (
                          <div key={reservation.id} className="p-4 bg-gray-50 rounded-lg">
                            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                              <div>
                                <h3 className="font-semibold text-lg">{reservation.apartment?.name}</h3>
                                <p className="text-gray-600 text-sm">{reservation.apartment?.address}</p>
                                <div className="flex items-center gap-2 mt-2">
                                  <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                                    {reservation.check_in_date} - {reservation.check_out_date}
                                  </span>
                                  <span
                                    className={`text-xs px-2 py-1 rounded-full ${
                                      reservation.status === "confirmed"
                                        ? "bg-green-100 text-green-800"
                                        : reservation.status === "pending"
                                          ? "bg-yellow-100 text-yellow-800"
                                          : "bg-red-100 text-red-800"
                                    }`}
                                  >
                                    {t(reservation.status, reservation.status)}
                                  </span>
                                </div>
                              </div>
                              <div className="text-right">
                                <p className="font-bold text-lg text-blue-600">${reservation.total_price}</p>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="mt-2"
                                  onClick={() => router.push(`/apartments/${reservation.apartment_id}`)}
                                >
                                  {t("view_apartment", "View Apartment")}
                                </Button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="py-12 text-center">
                        <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                          {t("no_reservations", "No Reservations Yet")}
                        </h3>
                        <p className="text-gray-600 mb-6">
                          {t("no_reservations_desc", "You haven't made any reservations yet.")}
                        </p>
                        <Button
                          className="bg-gradient-to-r from-blue-600 to-teal-600"
                          onClick={() => router.push("/apartments")}
                        >
                          {t("browse_apartments", "Browse Apartments")}
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}
