import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Home, MapPin, Instagram, Facebook } from "lucide-react"
import { LocationMap } from "./location-map"
import type { Apartment } from "@/lib/supabase"

interface ApartmentDetailProps {
  apartment: Apartment
}

export function ApartmentDetail({ apartment }: ApartmentDetailProps) {
  return (
    <div className="space-y-6">
      <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="text-2xl">Detalji Apartmana</span>
            <div className="flex items-center gap-2">
              {apartment.instagram_url && (
                <a
                  href={apartment.instagram_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:shadow-lg transition-all duration-200"
                >
                  <Instagram className="w-5 h-5" />
                </a>
              )}
              {apartment.facebook_url && (
                <a
                  href={apartment.facebook_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-blue-600 text-white hover:shadow-lg transition-all duration-200"
                >
                  <Facebook className="w-5 h-5" />
                </a>
              )}
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-xl">
              <Home className="w-6 h-6 text-blue-600" />
              <div>
                <p className="font-semibold text-gray-900">{apartment.number_of_rooms}</p>
                <p className="text-sm text-gray-600">Sobe</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 bg-teal-50 rounded-xl">
              <Users className="w-6 h-6 text-teal-600" />
              <div>
                <p className="font-semibold text-gray-900">{apartment.capacity}</p>
                <p className="text-sm text-gray-600">Gostiju</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 bg-amber-50 rounded-xl">
              <MapPin className="w-6 h-6 text-amber-600" />
              <div>
                <p className="font-semibold text-gray-900">${apartment.price_per_night}</p>
                <p className="text-sm text-gray-600">Po noći</p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-3">Opis</h3>
            <p className="text-gray-700 leading-relaxed">{apartment.description}</p>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-3">Lokacija</h3>
            <p className="text-gray-700 flex items-center gap-2 mb-4">
              <MapPin className="w-4 h-4" />
              {apartment.address}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Mapa lokacije */}
      {apartment.latitude && apartment.longitude && (
        <LocationMap latitude={apartment.latitude} longitude={apartment.longitude} address={apartment.address} />
      )}
    </div>
  )
}
