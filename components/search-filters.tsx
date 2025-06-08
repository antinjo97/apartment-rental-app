"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { Filter, X, CalendarIcon, MapPin, Users } from "lucide-react"
import { useLanguage } from "@/components/language-provider"
import { format } from "date-fns"
import type { DateRange } from "react-day-picker"

interface SearchFiltersProps {
  onSearch?: (filters: {
    location: string
    minPrice: number
    maxPrice: number
    guests: number
    rooms: number
    amenities: string[]
    checkIn: string
    checkOut: string
  }) => void
}

export function SearchFilters({ onSearch }: SearchFiltersProps) {
  const [location, setLocation] = useState("")
  const [priceRange, setPriceRange] = useState([0, 500])
  const [guests, setGuests] = useState("")
  const [rooms, setRooms] = useState("")
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([])
  const [dateRange, setDateRange] = useState<DateRange | undefined>()
  const { t } = useLanguage()

  const amenities = ["WiFi", "Pool", "Parking", "Kitchen", "AC", "Beach Access", "Gym", "Pet Friendly"]

  const toggleAmenity = (amenity: string) => {
    setSelectedAmenities((prev) => (prev.includes(amenity) ? prev.filter((a) => a !== amenity) : [...prev, amenity]))
  }

  const handleApplyFilters = () => {
    if (onSearch) {
      onSearch({
        location,
        minPrice: priceRange[0],
        maxPrice: priceRange[1],
        guests: guests ? Number.parseInt(guests) : 0,
        rooms: rooms ? Number.parseInt(rooms) : 0,
        amenities: selectedAmenities,
        checkIn: dateRange?.from ? format(dateRange.from, "yyyy-MM-dd") : "",
        checkOut: dateRange?.to ? format(dateRange.to, "yyyy-MM-dd") : "",
      })
    }
  }

  const handleClearFilters = () => {
    setLocation("")
    setPriceRange([0, 500])
    setGuests("")
    setRooms("")
    setSelectedAmenities([])
    setDateRange(undefined)

    if (onSearch) {
      onSearch({
        location: "",
        minPrice: 0,
        maxPrice: 500,
        guests: 0,
        rooms: 0,
        amenities: [],
        checkIn: "",
        checkOut: "",
      })
    }
  }

  return (
    <Card className="bg-white shadow-2xl border-2 border-gray-100">
      <CardContent className="p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <div>
            <label className="text-base font-bold text-gray-900 mb-3 block flex items-center">
              <MapPin className="w-5 h-5 mr-2 text-blue-600" />
              {t("location", "Lokacija")}
            </label>
            <Input
              placeholder={t("where_going", "Gdje idete?")}
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="h-12 border-2 border-gray-400 focus:border-blue-600 focus:ring-4 focus:ring-blue-100 bg-white text-gray-900 text-base font-medium placeholder:text-gray-700 placeholder:font-medium"
            />
          </div>

          <div>
            <label className="text-base font-bold text-gray-900 mb-3 block flex items-center">
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

          <div>
            <label className="text-base font-bold text-gray-900 mb-3 block">{t("check_out", "Check-out")}</label>
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

          <div>
            <label className="text-base font-bold text-gray-900 mb-3 block flex items-center">
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

        <div className="mb-6">
          <label className="text-base font-bold text-gray-900 mb-4 block">{t("amenities", "Sadržaji")}</label>
          <div className="flex flex-wrap gap-3">
            {amenities.map((amenity) => (
              <Badge
                key={amenity}
                variant={selectedAmenities.includes(amenity) ? "default" : "outline"}
                className={`cursor-pointer transition-all duration-200 px-4 py-2 text-sm font-semibold ${
                  selectedAmenities.includes(amenity)
                    ? "bg-gradient-to-r from-blue-600 to-teal-600 text-white hover:from-blue-700 hover:to-teal-700 border-0"
                    : "border-2 border-gray-400 text-gray-800 hover:bg-blue-100 hover:border-blue-400 hover:text-blue-800 bg-white"
                }`}
                onClick={() => toggleAmenity(amenity)}
              >
                {amenity}
                {selectedAmenities.includes(amenity) && <X className="w-3 h-3 ml-2" />}
              </Badge>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <label className="text-base font-bold text-gray-900 mb-4 block">{t("price_range", "Raspon cijena")}</label>
          <div className="px-4">
            <Slider
              value={priceRange}
              onValueChange={setPriceRange}
              max={500}
              step={10}
              className="w-full [&_[role=slider]]:bg-blue-600 [&_[role=slider]]:border-blue-600 [&_[role=slider]]:h-5 [&_[role=slider]]:w-5 [&_.bg-primary]:bg-blue-600 [&_.bg-primary]:h-2"
            />
            <div className="flex justify-between text-base font-bold text-gray-800 mt-4">
              <span className="bg-blue-200 text-blue-900 px-3 py-2 rounded-lg font-bold">${priceRange[0]}</span>
              <span className="bg-blue-200 text-blue-900 px-3 py-2 rounded-lg font-bold">${priceRange[1]}</span>
            </div>
          </div>
        </div>

        <div className="flex gap-4">
          <Button
            className="bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 text-white font-bold px-8 py-3 text-base shadow-xl h-12"
            onClick={handleApplyFilters}
          >
            <Filter className="w-5 h-5 mr-2" />
            {t("apply_filters", "Primijeni filtere")}
          </Button>
          <Button
            variant="outline"
            onClick={handleClearFilters}
            className="border-2 border-gray-400 text-gray-800 hover:bg-gray-100 hover:border-gray-500 font-bold px-8 py-3 text-base h-12"
          >
            {t("clear_all", "Očisti sve")}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
