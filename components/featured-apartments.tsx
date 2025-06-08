"use client"

import { useEffect, useState } from "react"
import { ApartmentCard } from "@/components/apartment-card"
import { getApartments } from "@/lib/apartments"
import type { Apartment } from "@/lib/supabase"
import { motion } from "framer-motion"
import { useLanguage } from "@/components/language-provider"

export function FeaturedApartments() {
  const [apartments, setApartments] = useState<Apartment[]>([])
  const [loading, setLoading] = useState(true)
  const { t } = useLanguage()

  useEffect(() => {
    async function fetchFeaturedApartments() {
      try {
        const data = await getApartments()
        setApartments(data.slice(0, 4)) // Show only first 4 apartments
      } catch (error) {
        console.error("Error fetching featured apartments:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchFeaturedApartments()
  }, [])

  if (loading || apartments.length === 0) {
    return null
  }

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
          >
            {t("featured_apartments", "Featured Apartments")}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-gray-600 text-lg max-w-2xl mx-auto"
          >
            {t("featured_description", "Discover our most popular and highly-rated vacation rentals")}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {apartments.map((apartment, index) => (
            <motion.div
              key={apartment.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <ApartmentCard apartment={apartment} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
