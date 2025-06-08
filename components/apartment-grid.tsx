"use client"

import { useEffect, useState } from "react"
import { ApartmentCard } from "@/components/apartment-card"
import { LoadingSpinner } from "@/components/loading-spinner"
import { getApartments } from "@/lib/apartments"
import type { Apartment } from "@/lib/supabase"
import { motion } from "framer-motion"

export function ApartmentGrid() {
  const [apartments, setApartments] = useState<Apartment[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchApartments() {
      try {
        setLoading(true)
        const data = await getApartments()
        setApartments(data)
      } catch (err) {
        setError("Greška pri dohvaćanju apartmana")
        console.error("Error fetching apartments:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchApartments()
  }, [])

  if (loading) {
    return <LoadingSpinner />
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600 text-lg">{error}</p>
      </div>
    )
  }

  if (apartments.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600 text-lg">Nema dostupnih apartmana.</p>
      </div>
    )
  }

  return (
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
  )
}
