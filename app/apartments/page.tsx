"use client"

import { useState, useEffect } from "react"
import { ApartmentCard } from "@/components/apartment-card"
import { SearchFilters } from "@/components/search-filters"
import { LoadingSpinner } from "@/components/loading-spinner"
import { getApartments, searchApartments } from "@/lib/apartments"
import { useLanguage } from "@/components/language-provider"
import { motion } from "framer-motion"
import type { Apartment } from "@/lib/supabase"

export default function ApartmentsPage() {
  const [apartments, setApartments] = useState<Apartment[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [filters, setFilters] = useState({
    location: "",
    minPrice: 0,
    maxPrice: 500,
    guests: 0,
    rooms: 0,
    amenities: [] as string[],
    checkIn: "",
    checkOut: "",
  })
  const { t } = useLanguage()

  useEffect(() => {
    fetchApartments()
  }, [])

  const fetchApartments = async () => {
    try {
      setLoading(true)
      const data = await getApartments()
      setApartments(data)
    } catch (err) {
      setError(t("error_fetching", "Error fetching apartments"))
      console.error("Error fetching apartments:", err)
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = async (searchFilters: typeof filters) => {
    try {
      setLoading(true)
      setFilters(searchFilters)
      const data = await searchApartments(searchFilters)
      setApartments(data)
    } catch (err) {
      setError(t("error_searching", "Error searching apartments"))
      console.error("Error searching apartments:", err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-amber-50">
      <div className="container mx-auto px-4 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{t("all_apartments", "All Apartments")}</h1>
          <p className="text-gray-600 text-lg">{t("find_perfect_stay", "Find your perfect stay")}</p>
        </div>

        <SearchFilters onSearch={handleSearch} />

        {loading ? (
          <LoadingSpinner />
        ) : error ? (
          <div className="text-center py-12">
            <p className="text-red-600 text-lg">{error}</p>
          </div>
        ) : apartments.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">{t("no_apartments", "No apartments found matching your criteria.")}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-8">
            {apartments.map((apartment, index) => (
              <motion.div
                key={apartment.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <ApartmentCard apartment={apartment} />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
