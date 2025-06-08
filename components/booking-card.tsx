"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { CalendarIcon, Users } from "lucide-react"
import { format } from "date-fns"
import { useAuth } from "@/components/auth-provider"
import { useLanguage } from "@/components/language-provider"
import { createReservation, getApartmentAvailability } from "@/lib/reservations"
import { useToast } from "@/hooks/use-toast"
import type { DateRange } from "react-day-picker"
import type { Apartment } from "@/lib/supabase"

interface BookingCardProps {
  apartment: Apartment
}

export function BookingCard({ apartment }: BookingCardProps) {
  const [dateRange, setDateRange] = useState<DateRange | undefined>()
  const [guests, setGuests] = useState("2")
  const [guestFirstName, setGuestFirstName] = useState("")
  const [guestLastName, setGuestLastName] = useState("")
  const [guestEmail, setGuestEmail] = useState("")
  const [guestPhone, setGuestPhone] = useState("")
  const [loading, setLoading] = useState(false)
  const [isBookingDialogOpen, setIsBookingDialogOpen] = useState(false)

  const { user } = useAuth()
  const { t } = useLanguage()
  const { toast } = useToast()

  const calculateTotal = () => {
    if (!dateRange?.from || !dateRange?.to) return 0
    const nights = Math.ceil((dateRange.to.getTime() - dateRange.from.getTime()) / (1000 * 60 * 60 * 24))
    const subtotal = nights * apartment.price_per_night
    const serviceFee = subtotal * 0.1
    const cleaningFee = 50
    return subtotal + serviceFee + cleaningFee
  }

  const nights =
    dateRange?.from && dateRange?.to
      ? Math.ceil((dateRange.to.getTime() - dateRange.from.getTime()) / (1000 * 60 * 60 * 24))
      : 0

  const handleBooking = async () => {
    if (!dateRange?.from || !dateRange?.to) {
      toast({
        title: t("error", "Error"),
        description: t("select_dates", "Please select check-in and check-out dates"),
        variant: "destructive",
      })
      return
    }

    if (!user && (!guestFirstName || !guestLastName || !guestEmail)) {
      toast({
        title: t("error", "Error"),
        description: t("fill_guest_info", "Please fill in your contact information"),
        variant: "destructive",
      })
      return
    }

    setLoading(true)

    try {
      console.log("Starting booking process...")
      console.log("Apartment ID:", apartment.id)
      console.log("Date range:", { from: dateRange.from, to: dateRange.to })
      console.log("User:", user)

      // Check availability
      const isAvailable = await getApartmentAvailability(
        apartment.id,
        format(dateRange.from, "yyyy-MM-dd"),
        format(dateRange.to, "yyyy-MM-dd"),
      )

      console.log("Availability check result:", isAvailable)

      if (!isAvailable) {
        toast({
          title: t("not_available", "Not Available"),
          description: t("dates_not_available", "Selected dates are not available"),
          variant: "destructive",
        })
        return
      }

      // Create reservation
      const reservationData = {
        apartment_id: apartment.id,
        user_id: user?.id || null,
        guest_name: user ? null : `${guestFirstName} ${guestLastName}`,
        guest_email: user?.email || guestEmail,
        guest_phone: guestPhone || null,
        check_in_date: format(dateRange.from, "yyyy-MM-dd"),
        check_out_date: format(dateRange.to, "yyyy-MM-dd"),
        total_price: calculateTotal(),
        status: "pending" as const,
      }

      console.log("Reservation data:", reservationData)

      const result = await createReservation(reservationData)
      console.log("Reservation created:", result)

      toast({
        title: t("booking_success", "Booking Successful!"),
        description: t("booking_confirmation", "Your reservation has been submitted and is pending confirmation."),
      })

      setIsBookingDialogOpen(false)
      setDateRange(undefined)
      setGuests("2")
      setGuestFirstName("")
      setGuestLastName("")
      setGuestEmail("")
      setGuestPhone("")
    } catch (error) {
      console.error("Booking error details:", error)

      // Detaljniji error handling
      let errorMessage = t("booking_error_desc", "There was an error processing your booking. Please try again.")

      if (error instanceof Error) {
        console.error("Error message:", error.message)
        if (error.message.includes("relation") && error.message.includes("does not exist")) {
          errorMessage = t("table_missing", "Database table is missing. Please contact support.")
        } else if (error.message.includes("permission")) {
          errorMessage = t("permission_error", "Permission denied. Please try logging in again.")
        } else if (error.message.includes("duplicate")) {
          errorMessage = t("duplicate_booking", "A booking for these dates already exists.")
        }
      }

      toast({
        title: t("booking_error", "Booking Error"),
        description: errorMessage,
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="sticky top-8 bg-white/90 backdrop-blur-sm border-0 shadow-xl">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div>
            <span className="text-2xl font-bold">${apartment.price_per_night}</span>
            <span className="text-gray-600 text-base font-normal"> / {t("night", "night")}</span>
          </div>
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="justify-start text-left font-normal border-2 border-gray-300 hover:border-blue-500 hover:bg-blue-50 bg-white text-gray-900"
              >
                <CalendarIcon className="mr-2 h-4 w-4 text-blue-600" />
                {dateRange?.from ? (
                  <span className="text-gray-900">{format(dateRange.from, "MMM dd")}</span>
                ) : (
                  <span className="text-gray-500">{t("check_in", "Check-in")}</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 bg-white border-2 border-gray-200 shadow-xl" align="start">
              <Calendar
                mode="range"
                selected={dateRange}
                onSelect={setDateRange}
                numberOfMonths={2}
                disabled={(date) => date < new Date()}
                className="bg-white"
                classNames={{
                  months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
                  month: "space-y-4",
                  caption: "flex justify-center pt-1 relative items-center text-gray-900 font-semibold",
                  caption_label: "text-sm font-medium text-gray-900",
                  nav: "space-x-1 flex items-center",
                  nav_button: "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100 hover:bg-blue-100 rounded-md",
                  nav_button_previous: "absolute left-1",
                  nav_button_next: "absolute right-1",
                  table: "w-full border-collapse space-y-1",
                  head_row: "flex",
                  head_cell: "text-gray-600 rounded-md w-9 font-normal text-[0.8rem]",
                  row: "flex w-full mt-2",
                  cell: "text-center text-sm p-0 relative [&:has([aria-selected])]:bg-blue-100 first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
                  day: "h-9 w-9 p-0 font-normal text-gray-900 hover:bg-blue-100 hover:text-blue-900 rounded-md transition-colors",
                  day_selected:
                    "bg-blue-600 text-white hover:bg-blue-700 hover:text-white focus:bg-blue-600 focus:text-white",
                  day_today: "bg-blue-100 text-blue-900 font-semibold",
                  day_outside: "text-gray-400 opacity-50",
                  day_disabled: "text-gray-400 opacity-50",
                  day_range_middle: "aria-selected:bg-blue-100 aria-selected:text-blue-900",
                  day_hidden: "invisible",
                }}
              />
            </PopoverContent>
          </Popover>

          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="justify-start text-left font-normal border-2 border-gray-300 hover:border-blue-500 hover:bg-blue-50 bg-white text-gray-900"
              >
                <CalendarIcon className="mr-2 h-4 w-4 text-blue-600" />
                {dateRange?.to ? (
                  <span className="text-gray-900">{format(dateRange.to, "MMM dd")}</span>
                ) : (
                  <span className="text-gray-500">{t("check_out", "Check-out")}</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 bg-white border-2 border-gray-200 shadow-xl" align="start">
              <Calendar
                mode="range"
                selected={dateRange}
                onSelect={setDateRange}
                numberOfMonths={2}
                disabled={(date) => date < new Date()}
                className="bg-white"
                classNames={{
                  months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
                  month: "space-y-4",
                  caption: "flex justify-center pt-1 relative items-center text-gray-900 font-semibold",
                  caption_label: "text-sm font-medium text-gray-900",
                  nav: "space-x-1 flex items-center",
                  nav_button: "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100 hover:bg-blue-100 rounded-md",
                  nav_button_previous: "absolute left-1",
                  nav_button_next: "absolute right-1",
                  table: "w-full border-collapse space-y-1",
                  head_row: "flex",
                  head_cell: "text-gray-600 rounded-md w-9 font-normal text-[0.8rem]",
                  row: "flex w-full mt-2",
                  cell: "text-center text-sm p-0 relative [&:has([aria-selected])]:bg-blue-100 first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
                  day: "h-9 w-9 p-0 font-normal text-gray-900 hover:bg-blue-100 hover:text-blue-900 rounded-md transition-colors",
                  day_selected:
                    "bg-blue-600 text-white hover:bg-blue-700 hover:text-white focus:bg-blue-600 focus:text-white",
                  day_today: "bg-blue-100 text-blue-900 font-semibold",
                  day_outside: "text-gray-400 opacity-50",
                  day_disabled: "text-gray-400 opacity-50",
                  day_range_middle: "aria-selected:bg-blue-100 aria-selected:text-blue-900",
                  day_hidden: "invisible",
                }}
              />
            </PopoverContent>
          </Popover>
        </div>

        <Select value={guests} onValueChange={setGuests}>
          <SelectTrigger className="border-2 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 bg-white text-gray-900">
            <Users className="mr-2 h-4 w-4 text-blue-600" />
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-white border-2 border-gray-200">
            {Array.from({ length: apartment.capacity }, (_, i) => (
              <SelectItem key={i + 1} value={String(i + 1)} className="text-gray-900 hover:bg-blue-50">
                {i + 1} {t("guest", "Guest")}
                {i + 1 > 1 ? "s" : ""}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {nights > 0 && (
          <div className="space-y-2 pt-4 border-t">
            <div className="flex justify-between">
              <span>
                ${apartment.price_per_night} × {nights} {t("nights", "nights")}
              </span>
              <span>${apartment.price_per_night * nights}</span>
            </div>
            <div className="flex justify-between">
              <span>{t("service_fee", "Service fee")}</span>
              <span>${Math.round(apartment.price_per_night * nights * 0.1)}</span>
            </div>
            <div className="flex justify-between">
              <span>{t("cleaning_fee", "Cleaning fee")}</span>
              <span>$50</span>
            </div>
            <div className="flex justify-between font-semibold text-lg pt-2 border-t">
              <span>{t("total", "Total")}</span>
              <span>${calculateTotal()}</span>
            </div>
          </div>
        )}

        <Dialog open={isBookingDialogOpen} onOpenChange={setIsBookingDialogOpen}>
          <DialogTrigger asChild>
            <Button
              className="w-full bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 text-white h-12 text-lg font-semibold"
              disabled={!dateRange?.from || !dateRange?.to}
            >
              {t("reserve_now", "Reserve Now")}
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>{t("confirm_booking", "Confirm Your Booking")}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              {!user && (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="guestFirstName">
                        {t("first_name", "First Name")} <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="guestFirstName"
                        value={guestFirstName}
                        onChange={(e) => setGuestFirstName(e.target.value)}
                        placeholder={t("enter_first_name", "Enter your first name")}
                        required
                        className="border-2 border-gray-300 focus:border-blue-500 bg-white text-gray-900"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="guestLastName">
                        {t("last_name", "Last Name")} <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="guestLastName"
                        value={guestLastName}
                        onChange={(e) => setGuestLastName(e.target.value)}
                        placeholder={t("enter_last_name", "Enter your last name")}
                        required
                        className="border-2 border-gray-300 focus:border-blue-500 bg-white text-gray-900"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="guestEmail">
                      {t("email", "Email")} <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="guestEmail"
                      type="email"
                      value={guestEmail}
                      onChange={(e) => setGuestEmail(e.target.value)}
                      placeholder={t("enter_email", "Enter your email")}
                      required
                      className="border-2 border-gray-300 focus:border-blue-500 bg-white text-gray-900"
                    />
                  </div>
                </>
              )}
              <div className="space-y-2">
                <Label htmlFor="guestPhone">
                  {t("phone", "Phone")} ({t("optional", "optional")})
                </Label>
                <Input
                  id="guestPhone"
                  value={guestPhone}
                  onChange={(e) => setGuestPhone(e.target.value)}
                  placeholder={t("enter_phone", "Enter your phone number")}
                  className="border-2 border-gray-300 focus:border-blue-500 bg-white text-gray-900"
                />
              </div>

              <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                <div className="flex justify-between">
                  <span>{t("dates", "Dates")}</span>
                  <span>
                    {dateRange?.from && dateRange?.to
                      ? `${format(dateRange.from, "MMM dd")} - ${format(dateRange.to, "MMM dd")}`
                      : t("not_selected", "Not selected")}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>{t("guests", "Guests")}</span>
                  <span>{guests}</span>
                </div>
                <div className="flex justify-between font-semibold">
                  <span>{t("total", "Total")}</span>
                  <span>${calculateTotal()}</span>
                </div>
              </div>

              <Button
                onClick={handleBooking}
                disabled={loading}
                className="w-full bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700"
              >
                {loading ? t("processing", "Processing...") : t("confirm_booking", "Confirm Booking")}
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        <p className="text-center text-sm text-gray-600">{t("no_charge_yet", "You won't be charged yet")}</p>
      </CardContent>
    </Card>
  )
}
