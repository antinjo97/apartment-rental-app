"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Heart, MapPin, Users, Home, Star } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { useState } from "react"

interface Apartment {
  id: number
  name: string
  description: string
  price_per_night: number
  number_of_rooms: number
  capacity: number
  image_urls: string[]
  address: string
  amenities: string[]
}

interface ApartmentCardProps {
  apartment: Apartment
}

export function ApartmentCard({ apartment }: ApartmentCardProps) {
  const [isLiked, setIsLiked] = useState(false)
  const [imageError, setImageError] = useState(false)

  // Use a fallback image if the original fails to load
  const getImageSrc = (url: string) => {
    if (imageError || !url || url.includes("placeholder.svg")) {
      // Generate a beautiful gradient background with apartment name
      const colors = [
        "from-blue-400 to-blue-600",
        "from-teal-400 to-teal-600",
        "from-purple-400 to-purple-600",
        "from-pink-400 to-pink-600",
        "from-indigo-400 to-indigo-600",
      ]
      const colorIndex = apartment.id % colors.length
      return `data:image/svg+xml,${encodeURIComponent(`
        <svg width="400" height="300" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style="stop-color:#3B82F6;stop-opacity:1" />
              <stop offset="100%" style="stop-color:#1E40AF;stop-opacity:1" />
            </linearGradient>
          </defs>
          <rect width="400" height="300" fill="url(#grad)"/>
          <text x="200" y="140" fontFamily="Arial, sans-serif" fontSize="18" fontWeight="bold" textAnchor="middle" fill="white">${apartment.name}</text>
          <text x="200" y="170" fontFamily="Arial, sans-serif" fontSize="14" textAnchor="middle" fill="rgba(255,255,255,0.8)">${apartment.address.split(",")[0]}</text>
        </svg>
      `)}`
    }
    return url
  }

  return (
    <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.3 }}>
      <Card className="overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm">
        <div className="relative">
          <div className="w-full h-48 relative overflow-hidden">
            <Image
              src={getImageSrc(apartment.image_urls[0]) || "/placeholder.svg"}
              alt={apartment.name}
              fill
              className="object-cover transition-transform duration-300 hover:scale-105"
              onError={() => setImageError(true)}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
          <Button
            variant="ghost"
            size="icon"
            className={`absolute top-3 right-3 rounded-full ${
              isLiked ? "bg-red-500 text-white" : "bg-white/80 text-gray-600"
            } hover:bg-red-500 hover:text-white transition-all duration-300`}
            onClick={() => setIsLiked(!isLiked)}
          >
            <Heart className={`w-4 h-4 ${isLiked ? "fill-current" : ""}`} />
          </Button>
          <div className="absolute top-3 left-3">
            <Badge className="bg-gradient-to-r from-blue-600 to-teal-600 text-white border-0">
              ${apartment.price_per_night}/noć
            </Badge>
          </div>
        </div>

        <CardContent className="p-4">
          <div className="flex items-start justify-between mb-2">
            <h3 className="font-semibold text-lg text-gray-900 line-clamp-1">{apartment.name}</h3>
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
              <span className="text-sm text-gray-600">4.8</span>
            </div>
          </div>

          <div className="flex items-center text-gray-600 mb-2">
            <MapPin className="w-4 h-4 mr-1" />
            <span className="text-sm">{apartment.address}</span>
          </div>

          <p className="text-gray-600 text-sm mb-3 line-clamp-2">{apartment.description}</p>

          <div className="flex items-center gap-4 mb-3 text-sm text-gray-600">
            <div className="flex items-center gap-1">
              <Home className="w-4 h-4" />
              <span>{apartment.number_of_rooms} sobe</span>
            </div>
            <div className="flex items-center gap-1">
              <Users className="w-4 h-4" />
              <span>{apartment.capacity} gostiju</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-1 mb-4">
            {apartment.amenities.slice(0, 3).map((amenity) => (
              <Badge key={amenity} variant="secondary" className="text-xs">
                {amenity}
              </Badge>
            ))}
            {apartment.amenities.length > 3 && (
              <Badge variant="secondary" className="text-xs">
                +{apartment.amenities.length - 3} više
              </Badge>
            )}
          </div>

          <Link href={`/apartments/${apartment.id}`}>
            <Button className="w-full bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 text-white transition-all duration-300">
              Pogledaj detalje
            </Button>
          </Link>
        </CardContent>
      </Card>
    </motion.div>
  )
}
