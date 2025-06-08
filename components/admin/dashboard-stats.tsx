"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { getApartments } from "@/lib/apartments"
import { getReservations } from "@/lib/reservations"
import { Home, Calendar, DollarSign, Users } from "lucide-react"
import { useLanguage } from "@/components/language-provider"
import type { Apartment, Reservation } from "@/lib/supabase"

export function DashboardStats() {
  const [apartments, setApartments] = useState<Apartment[]>([])
  const [reservations, setReservations] = useState<Reservation[]>([])
  const [loading, setLoading] = useState(true)
  const { t } = useLanguage()

  useEffect(() => {
    async function fetchData() {
      try {
        const [apartmentsData, reservationsData] = await Promise.all([getApartments(), getReservations()])
        setApartments(apartmentsData)
        setReservations(reservationsData)
      } catch (error) {
        console.error("Error fetching dashboard data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const totalRevenue = reservations.filter((r) => r.status === "confirmed").reduce((sum, r) => sum + r.total_price, 0)

  const pendingReservations = reservations.filter((r) => r.status === "pending").length
  const confirmedReservations = reservations.filter((r) => r.status === "confirmed").length

  const stats = [
    {
      title: t("total_apartments", "Total Apartments"),
      value: apartments.length,
      icon: Home,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      title: t("total_reservations", "Total Reservations"),
      value: reservations.length,
      icon: Calendar,
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      title: t("total_revenue", "Total Revenue"),
      value: `$${totalRevenue.toLocaleString()}`,
      icon: DollarSign,
      color: "text-yellow-600",
      bgColor: "bg-yellow-100",
    },
    {
      title: t("pending_reservations", "Pending Reservations"),
      value: pendingReservations,
      icon: Users,
      color: "text-red-600",
      bgColor: "bg-red-100",
    },
  ]

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardContent className="p-6">
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-8 bg-gray-200 rounded w-1/2"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-full ${stat.bgColor}`}>
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
          <CardHeader>
            <CardTitle>{t("recent_reservations", "Recent Reservations")}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {reservations.slice(0, 5).map((reservation) => (
                <div key={reservation.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium">{reservation.guest_name || reservation.guest_email}</p>
                    <p className="text-sm text-gray-600">
                      {reservation.check_in_date} - {reservation.check_out_date}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">${reservation.total_price}</p>
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${
                        reservation.status === "confirmed"
                          ? "bg-green-100 text-green-800"
                          : reservation.status === "pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                      }`}
                    >
                      {reservation.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
          <CardHeader>
            <CardTitle>{t("apartment_performance", "Apartment Performance")}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {apartments.slice(0, 5).map((apartment) => {
                const apartmentReservations = reservations.filter((r) => r.apartment_id === apartment.id)
                const revenue = apartmentReservations
                  .filter((r) => r.status === "confirmed")
                  .reduce((sum, r) => sum + r.total_price, 0)

                return (
                  <div key={apartment.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium">{apartment.name}</p>
                      <p className="text-sm text-gray-600">{apartmentReservations.length} reservations</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">${revenue.toLocaleString()}</p>
                      <p className="text-sm text-gray-600">{t("revenue", "revenue")}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
