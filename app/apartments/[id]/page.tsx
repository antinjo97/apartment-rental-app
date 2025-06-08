import { getApartmentById } from "@/lib/apartments"
import { ApartmentDetail } from "@/components/apartment-detail"
import { BookingCard } from "@/components/booking-card"
import { ApartmentGallery } from "@/components/apartment-gallery"
import { ApartmentAmenities } from "@/components/apartment-amenities"
import { LocationMap } from "@/components/location-map"
import { LocalRecommendations } from "@/components/local-recommendations"
import { notFound } from "next/navigation"

export default async function ApartmentPage({ params }: { params: { id: string } }) {
  const apartmentId = Number.parseInt(params.id)

  if (isNaN(apartmentId)) {
    notFound()
  }

  const apartment = await getApartmentById(apartmentId)

  if (!apartment) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-amber-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">{apartment.name}</h1>
          <p className="text-gray-600 text-lg">{apartment.address}</p>
        </div>

        <ApartmentGallery images={apartment.image_urls} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
          <div className="lg:col-span-2 space-y-8">
            <ApartmentDetail apartment={apartment} />
            <ApartmentAmenities amenities={apartment.amenities} />
            {apartment.latitude && apartment.longitude && (
              <LocationMap latitude={apartment.latitude} longitude={apartment.longitude} address={apartment.address} />
            )}
            <LocalRecommendations apartmentId={apartment.id} />
          </div>

          <div className="lg:col-span-1">
            <BookingCard apartment={apartment} />
          </div>
        </div>
      </div>
    </div>
  )
}
