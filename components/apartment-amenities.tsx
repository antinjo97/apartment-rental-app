import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Wifi, Car, Utensils, Waves, Dumbbell, Snowflake, TreePine, Wine, MapPin, Home } from "lucide-react"

interface ApartmentAmenitiesProps {
  amenities: string[]
}

const amenityIcons: Record<string, any> = {
  WiFi: Wifi,
  Parking: Car,
  Kitchen: Utensils,
  Pool: Waves,
  "Beach Access": Waves,
  Gym: Dumbbell,
  AC: Snowflake,
  Fireplace: TreePine,
  "Wine Tasting": Wine,
  "Mountain View": MapPin,
  "City View": Home,
  "Countryside View": TreePine,
  "Hot Tub": Waves,
  "BBQ Grill": Utensils,
  Hiking: TreePine,
  Rooftop: Home,
  Garden: TreePine,
}

export function ApartmentAmenities({ amenities }: ApartmentAmenitiesProps) {
  return (
    <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl">Sadržaji</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {amenities.map((amenity) => {
            const IconComponent = amenityIcons[amenity] || Home
            return (
              <div
                key={amenity}
                className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
              >
                <IconComponent className="w-5 h-5 text-blue-600" />
                <span className="text-sm font-medium text-gray-900">{amenity}</span>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
