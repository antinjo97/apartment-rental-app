"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { getReservations, updateReservationStatus, deleteReservation } from "@/lib/reservations"
import { useLanguage } from "@/components/language-provider"
import { useToast } from "@/hooks/use-toast"
import { Calendar, User, Mail, Phone, Trash2, Check, X, Clock } from "lucide-react"
import type { Reservation } from "@/lib/supabase"

export function ReservationManagement() {
  const [reservations, setReservations] = useState<Reservation[]>([])
  const [loading, setLoading] = useState(true)
  const [statusFilter, setStatusFilter] = useState<string>("all")

  const { t } = useLanguage()
  const { toast } = useToast()

  useEffect(() => {
    fetchReservations()
  }, [])

  const fetchReservations = async () => {
    try {
      const data = await getReservations()
      setReservations(data)
    } catch (error) {
      console.error("Error fetching reservations:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleStatusUpdate = async (id: number, status: "pending" | "confirmed" | "cancelled") => {
    try {
      await updateReservationStatus(id, status)
      toast({
        title: t("success", "Success"),
        description: t("reservation_updated", "Reservation status updated successfully"),
      })
      fetchReservations()
    } catch (error) {
      console.error("Error updating reservation:", error)
      toast({
        title: t("error", "Error"),
        description: t("reservation_update_error", "Error updating reservation"),
        variant: "destructive",
      })
    }
  }

  const handleDelete = async (id: number) => {
    if (!confirm(t("confirm_delete", "Are you sure you want to delete this reservation?"))) {
      return
    }

    try {
      await deleteReservation(id)
      toast({
        title: t("success", "Success"),
        description: t("reservation_deleted", "Reservation deleted successfully"),
      })
      fetchReservations()
    } catch (error) {
      console.error("Error deleting reservation:", error)
      toast({
        title: t("error", "Error"),
        description: t("reservation_delete_error", "Error deleting reservation"),
        variant: "destructive",
      })
    }
  }

  const filteredReservations = reservations.filter((reservation) => {
    if (statusFilter === "all") return true
    return reservation.status === statusFilter
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "confirmed":
        return <Check className="w-3 h-3" />
      case "pending":
        return <Clock className="w-3 h-3" />
      case "cancelled":
        return <X className="w-3 h-3" />
      default:
        return null
    }
  }

  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardContent className="p-6">
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">{t("reservation_management", "Reservation Management")}</h2>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-48">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{t("all_reservations", "All Reservations")}</SelectItem>
            <SelectItem value="pending">{t("pending", "Pending")}</SelectItem>
            <SelectItem value="confirmed">{t("confirmed", "Confirmed")}</SelectItem>
            <SelectItem value="cancelled">{t("cancelled", "Cancelled")}</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-4">
        {filteredReservations.map((reservation) => (
          <Card key={reservation.id} className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span>#{reservation.id}</span>
                  <Badge className={`${getStatusColor(reservation.status)} flex items-center gap-1`}>
                    {getStatusIcon(reservation.status)}
                    {reservation.status}
                  </Badge>
                </div>
                <div className="flex gap-2">
                  {reservation.status === "pending" && (
                    <>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleStatusUpdate(reservation.id, "confirmed")}
                        className="text-green-600 border-green-600 hover:bg-green-50"
                      >
                        <Check className="w-4 h-4 mr-1" />
                        {t("confirm", "Confirm")}
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleStatusUpdate(reservation.id, "cancelled")}
                        className="text-red-600 border-red-600 hover:bg-red-50"
                      >
                        <X className="w-4 h-4 mr-1" />
                        {t("cancel", "Cancel")}
                      </Button>
                    </>
                  )}
                  <Button variant="ghost" size="sm" onClick={() => handleDelete(reservation.id)}>
                    <Trash2 className="w-4 h-4 text-red-600" />
                  </Button>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <h4 className="font-semibold text-gray-900">{t("guest_information", "Guest Information")}</h4>
                  <div className="space-y-2">
                    {reservation.guest_name && (
                      <div className="flex items-center gap-2 text-sm">
                        <User className="w-4 h-4 text-gray-400" />
                        <span>{reservation.guest_name}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-2 text-sm">
                      <Mail className="w-4 h-4 text-gray-400" />
                      <span>{reservation.guest_email}</span>
                    </div>
                    {reservation.guest_phone && (
                      <div className="flex items-center gap-2 text-sm">
                        <Phone className="w-4 h-4 text-gray-400" />
                        <span>{reservation.guest_phone}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-semibold text-gray-900">{t("reservation_details", "Reservation Details")}</h4>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <span>
                        {reservation.check_in_date} - {reservation.check_out_date}
                      </span>
                    </div>
                    <div className="text-sm">
                      <span className="text-gray-600">{t("apartment", "Apartment")}: </span>
                      <span className="font-medium">{reservation.apartment?.name}</span>
                    </div>
                    <div className="text-sm">
                      <span className="text-gray-600">{t("total_price", "Total Price")}: </span>
                      <span className="font-bold text-lg text-blue-600">${reservation.total_price}</span>
                    </div>
                  </div>
                </div>
              </div>

              {reservation.apartment && (
                <div className="pt-4 border-t">
                  <h4 className="font-semibold text-gray-900 mb-2">{t("apartment_details", "Apartment Details")}</h4>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="font-medium">{reservation.apartment.name}</p>
                    <p className="text-sm text-gray-600">{reservation.apartment.address}</p>
                    <p className="text-sm text-gray-600">
                      {reservation.apartment.number_of_rooms} {t("rooms", "rooms")} • {reservation.apartment.capacity}{" "}
                      {t("guests", "guests")}
                    </p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}

        {filteredReservations.length === 0 && (
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-12 text-center">
              <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {t("no_reservations", "No Reservations Found")}
              </h3>
              <p className="text-gray-600">
                {statusFilter === "all"
                  ? t("no_reservations_desc", "There are no reservations yet.")
                  : t("no_reservations_filter", `No ${statusFilter} reservations found.`)}
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
