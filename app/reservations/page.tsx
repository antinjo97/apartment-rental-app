"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/components/auth-provider"
import { useLanguage } from "@/components/language-provider"
import { getReservationsByUserId } from "@/lib/reservations"
import { Calendar, MapPin, Home, Users, CalendarIcon } from "lucide-react"
import type { Reservation } from "@/lib/supabase"

export default function ReservationsPage() {
  const { user, loading } = useAuth()
  const { t } = useLanguage()
  const router = useRouter()
  const [reservations, setReservations] = useState<Reservation[]>([])
  const [loadingReservations, setLoadingReservations] = useState(true)

  useEffect(() => {
    if (!loading && !user) {
      router.push("/auth/signin")
    }
  }, [user, loading, router])

  useEffect(() => {
    async function fetchUserReservations() {
      if (user) {
        try {
          const data = await getReservationsByUserId(user.id)
          setReservations(data)
        } catch (error) {
          console.error("Error fetching user reservations:", error)
        } finally {
          setLoadingReservations(false)
        }
      }
    }

    if (user) {
      fetchUserReservations()
    }
  }, [user])

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-amber-50">
      <div className="container mx-auto px-4 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{t("my_reservations", "My Reservations")}</h1>
          <p className="text-gray-600">
            {t("view_manage_reservations", "View and manage your apartment reservations")}
          </p>
        </div>

        {loadingReservations ? (
          <div className="py-12 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">{t("loading_reservations", "Loading your reservations...")}</p>
          </div>
        ) : reservations.length > 0 ? (
          <div className="space-y-6">
            {reservations.map((reservation) => (
              <Card key={reservation.id} className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>{reservation.apartment?.name}</span>
                    <span
                      className={`text-sm px-3 py-1 rounded-full ${
                        reservation.status === "confirmed"
                          ? "bg-green-100 text-green-800"
                          : reservation.status === "pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                      }`}
                    >
                      {t(reservation.status, reservation.status)}
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-gray-600">
                        <MapPin className="w-4 h-4" />
                        <span>{reservation.apartment?.address}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <Home className="w-4 h-4" />
                        <span>
                          {reservation.apartment?.number_of_rooms} {t("rooms", "rooms")}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <Users className="w-4 h-4" />
                        <span>
                          {reservation.apartment?.capacity} {t("guests", "guests")}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-gray-600">
                        <CalendarIcon className="w-4 h-4" />
                        <span>
                          {t("check_in", "Check-in")}: <strong>{reservation.check_in_date}</strong>
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <CalendarIcon className="w-4 h-4" />
                        <span>
                          {t("check_out", "Check-out")}: <strong>{reservation.check_out_date}</strong>
                        </span>
                      </div>
                      <div className="flex items-center gap-2 font-semibold">
                        <span>{t("total", "Total")}:</span>
                        <span className="text-blue-600">${reservation.total_price}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <Button
                      onClick={() => router.push(`/apartments/${reservation.apartment_id}`)}
                      className="bg-gradient-to-r from-blue-600 to-teal-600"
                    >
                      {t("view_apartment", "View Apartment")}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-12 text-center">
              <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                {t("no_reservations_yet", "No Reservations Yet")}
              </h2>
              <p className="text-gray-600 mb-6 max-w-md mx-auto">
                {t(
                  "no_reservations_message",
                  "You haven't made any reservations yet. Start exploring our apartments and book your perfect stay!",
                )}
              </p>
              <Button onClick={() => router.push("/apartments")} className="bg-gradient-to-r from-blue-600 to-teal-600">
                {t("explore_apartments", "Explore Apartments")}
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
