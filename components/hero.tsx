"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { Search, MapPin, CalendarIcon, Users } from "lucide-react"
import { useLanguage } from "@/components/language-provider"
import { format } from "date-fns"
import type { DateRange } from "react-day-picker"
import Link from "next/link"

export function Hero() {
  const [searchQuery, setSearchQuery] = useState("")
  const [guests, setGuests] = useState("")
  const [dateRange, setDateRange] = useState<DateRange | undefined>()
  const { t } = useLanguage()

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <div
          className="w-full h-full bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')",
          }}
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center text-white">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            {t("hero_title", "Pronađite savršen odmor u Hrvatskoj")}
          </h1>

          <p className="text-xl md:text-2xl mb-8 text-gray-200 max-w-2xl mx-auto">
            {t("hero_subtitle", "Otkrijte prekrasne apartmane diljem Hrvatske")}
          </p>

          {/* Search Bar - Updated with same styling as search-filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-white shadow-2xl border-2 border-gray-100 rounded-2xl p-8 max-w-5xl mx-auto"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-end">
              {/* Location */}
              <div className="space-y-3">
                <label className="text-base font-bold text-gray-900 flex items-center">
                  <MapPin className="w-5 h-5 mr-2 text-blue-600" />
                  {t("location", "Lokacija")}
                </label>
                <Input
                  placeholder={t("where_going", "Gdje idete?")}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="h-12 border-2 border-gray-400 focus:border-blue-600 focus:ring-4 focus:ring-blue-100 bg-white text-gray-900 text-base font-medium placeholder:text-gray-700 placeholder:font-medium"
                />
              </div>

              {/* Check In */}
              <div className="space-y-3">
                <label className="text-base font-bold text-gray-900 flex items-center">
                  <CalendarIcon className="w-5 h-5 mr-2 text-blue-600" />
                  {t("check_in", "Check-in")}
                </label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full h-12 justify-start text-left font-medium border-2 border-gray-400 hover:border-blue-600 hover:bg-blue-50 bg-white text-gray-900 text-base"
                    >
                      {dateRange?.from ? (
                        <span className="text-gray-900 font-semibold">{format(dateRange.from, "dd.MM.yyyy.")}</span>
                      ) : (
                        <span className="text-gray-700 font-medium">{format(new Date(), "dd.MM.yyyy.")}</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 bg-white border-2 border-gray-300 shadow-2xl" align="start">
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
                        caption: "flex justify-center pt-1 relative items-center text-gray-900 font-bold text-base",
                        caption_label: "text-base font-bold text-gray-900",
                        nav: "space-x-1 flex items-center",
                        nav_button:
                          "h-8 w-8 bg-transparent p-0 opacity-70 hover:opacity-100 hover:bg-blue-100 rounded-md border border-gray-300",
                        nav_button_previous: "absolute left-1",
                        nav_button_next: "absolute right-1",
                        table: "w-full border-collapse space-y-1",
                        head_row: "flex",
                        head_cell: "text-gray-800 rounded-md w-10 font-bold text-sm",
                        row: "flex w-full mt-2",
                        cell: "text-center text-sm p-0 relative [&:has([aria-selected])]:bg-blue-200 first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
                        day: "h-10 w-10 p-0 font-semibold text-gray-900 hover:bg-blue-200 hover:text-blue-900 rounded-md transition-colors text-base",
                        day_selected:
                          "bg-blue-600 text-white hover:bg-blue-700 hover:text-white focus:bg-blue-600 focus:text-white font-bold",
                        day_today: "bg-blue-200 text-blue-900 font-bold border-2 border-blue-400",
                        day_outside: "text-gray-500 opacity-50",
                        day_disabled: "text-gray-400 opacity-50",
                        day_range_middle: "aria-selected:bg-blue-200 aria-selected:text-blue-900",
                        day_hidden: "invisible",
                      }}
                    />
                  </PopoverContent>
                </Popover>
              </div>

              {/* Check Out */}
              <div className="space-y-3">
                <label className="text-base font-bold text-gray-900">{t("check_out", "Check-out")}</label>
                <Button
                  variant="outline"
                  className="w-full h-12 justify-start text-left font-medium border-2 border-gray-400 hover:border-blue-600 hover:bg-blue-50 bg-white text-gray-900 text-base"
                >
                  {dateRange?.to ? (
                    <span className="text-gray-900 font-semibold">{format(dateRange.to, "dd.MM.yyyy.")}</span>
                  ) : (
                    <span className="text-gray-700 font-medium">dd.mm.gggg.</span>
                  )}
                </Button>
              </div>

              {/* Guests */}
              <div className="space-y-3">
                <label className="text-base font-bold text-gray-900 flex items-center">
                  <Users className="w-5 h-5 mr-2 text-blue-600" />
                  {t("guests", "Gosti")}
                </label>
                <Select value={guests} onValueChange={setGuests}>
                  <SelectTrigger className="h-12 border-2 border-gray-400 focus:border-blue-600 focus:ring-4 focus:ring-blue-100 bg-white text-gray-900 text-base font-medium">
                    <SelectValue
                      placeholder={t("number_of_guests", "4 gosta")}
                      className="text-gray-700 font-medium text-base"
                    />
                  </SelectTrigger>
                  <SelectContent className="bg-white border-2 border-gray-300 shadow-2xl">
                    <SelectItem value="any" className="text-gray-900 hover:bg-blue-100 font-medium text-base py-3">
                      {t("any", "Bilo koji broj")}
                    </SelectItem>
                    <SelectItem value="1" className="text-gray-900 hover:bg-blue-100 font-medium text-base py-3">
                      1 {t("guest", "gost")}
                    </SelectItem>
                    <SelectItem value="2" className="text-gray-900 hover:bg-blue-100 font-medium text-base py-3">
                      2 {t("guests", "gosta")}
                    </SelectItem>
                    <SelectItem value="3" className="text-gray-900 hover:bg-blue-100 font-medium text-base py-3">
                      3 {t("guests", "gosta")}
                    </SelectItem>
                    <SelectItem value="4" className="text-gray-900 hover:bg-blue-100 font-medium text-base py-3">
                      4 {t("guests", "gosta")}
                    </SelectItem>
                    <SelectItem value="5" className="text-gray-900 hover:bg-blue-100 font-medium text-base py-3">
                      5+ {t("guests", "gostiju")}
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="mt-8">
              <Link href="/apartments" className="block">
                <Button
                  size="lg"
                  className="w-full bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 text-white font-bold py-4 px-8 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 text-lg h-14"
                >
                  <Search className="w-6 h-6 mr-3" />
                  {t("search", "Pretraži")}
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* Quick Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto"
          >
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-400">50+</div>
              <div className="text-gray-300">{t("apartments", "Apartmana")}</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-teal-400">10+</div>
              <div className="text-gray-300">{t("cities", "Gradova")}</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-400">1000+</div>
              <div className="text-gray-300">{t("happy_guests", "Zadovoljnih gostiju")}</div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
      >
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
            className="w-1 h-3 bg-white/70 rounded-full mt-2"
          />
        </div>
      </motion.div>
    </section>
  )
}
