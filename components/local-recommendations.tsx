"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Utensils, Camera, TreePine } from "lucide-react"
import { getRecommendationsByApartmentId } from "@/lib/recommendations"
import type { Recommendation } from "@/lib/supabase"

interface LocalRecommendationsProps {
  apartmentId: number
}

const categoryIcons: Record<string, any> = {
  restaurant: Utensils,
  attraction: Camera,
  park: TreePine,
  beach: TreePine,
}

const categoryColors: Record<string, string> = {
  restaurant: "bg-red-100 text-red-800",
  attraction: "bg-blue-100 text-blue-800",
  park: "bg-green-100 text-green-800",
  beach: "bg-cyan-100 text-cyan-800",
}

export function LocalRecommendations({ apartmentId }: LocalRecommendationsProps) {
  const [recommendations, setRecommendations] = useState<Recommendation[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchRecommendations() {
      try {
        const data = await getRecommendationsByApartmentId(apartmentId)
        setRecommendations(data)
      } catch (error) {
        console.error("Error fetching recommendations:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchRecommendations()
  }, [apartmentId])

  if (loading) {
    return (
      <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
        <CardContent className="p-6">
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-gray-200 rounded w-1/4"></div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (recommendations.length === 0) {
    return null
  }

  return (
    <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl">Lokalne Preporuke</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recommendations.map((recommendation) => {
            const IconComponent = categoryIcons[recommendation.category] || MapPin
            const colorClass = categoryColors[recommendation.category] || "bg-gray-100 text-gray-800"

            return (
              <div key={recommendation.id} className="p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                <div className="flex items-start gap-3">
                  <IconComponent className="w-5 h-5 text-blue-600 mt-1" />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="font-semibold text-gray-900">{recommendation.name}</h4>
                      <Badge className={colorClass}>{recommendation.category}</Badge>
                    </div>
                    <p className="text-gray-700 text-sm mb-2">{recommendation.description}</p>
                    <p className="text-gray-600 text-xs flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {recommendation.location}
                    </p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
