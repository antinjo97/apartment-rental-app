import { ApartmentGrid } from "@/components/apartment-grid"
import { SearchFilters } from "@/components/search-filters"
import { Hero } from "@/components/hero"
import { FeaturedApartments } from "@/components/featured-apartments"
import { WhyChooseUs } from "@/components/why-choose-us"

export default async function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-amber-50">
      <Hero />
      <FeaturedApartments />
      <WhyChooseUs />

      <main className="container mx-auto px-4 py-12">
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Otkrijte Svoj Savršen Boravak</h2>
          <p className="text-gray-600 text-lg">Pronađite prekrasne apartmane za svoj sljedeći odmor</p>
        </div>

        <SearchFilters />
        <ApartmentGrid />
      </main>
    </div>
  )
}
