"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MapPin, Navigation } from "lucide-react"

interface LocationMapProps {
  latitude: number
  longitude: number
  address: string
}

export function LocationMap({ latitude, longitude, address }: LocationMapProps) {
  const googleMapsUrl = `https://www.google.com/maps?q=${latitude},${longitude}`
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`

  return (
    <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl flex items-center gap-2">
          <MapPin className="w-6 h-6" />
          Lokacija
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-gray-700">{address}</p>

        <div className="aspect-video bg-gray-200 rounded-xl flex items-center justify-center">
          <div className="text-center">
            <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-2" />
            <p className="text-gray-600">Interaktivna mapa</p>
            <p className="text-sm text-gray-500">
              Lat: {latitude}, Lng: {longitude}
            </p>
          </div>
        </div>

        <div className="flex gap-3">
          <Button variant="outline" className="flex-1" onClick={() => window.open(googleMapsUrl, "_blank")}>
            <MapPin className="w-4 h-4 mr-2" />
            Prikaži na mapi
          </Button>
          <Button
            className="flex-1 bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700"
            onClick={() => window.open(directionsUrl, "_blank")}
          >
            <Navigation className="w-4 h-4 mr-2" />
            Navigacija
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
