import { supabase } from "./supabase"
import type { Apartment } from "./supabase"

export async function getApartments(): Promise<Apartment[]> {
  const { data, error } = await supabase.from("apartments").select("*").order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching apartments:", error)
    return []
  }

  return data || []
}

export async function getApartmentById(id: number): Promise<Apartment | null> {
  const { data, error } = await supabase.from("apartments").select("*").eq("id", id).single()

  if (error) {
    console.error("Error fetching apartment:", error)
    return null
  }

  return data
}

export async function searchApartments(filters: {
  location?: string
  minPrice?: number
  maxPrice?: number
  guests?: number
  rooms?: number
  amenities?: string[]
  checkIn?: string
  checkOut?: string
}): Promise<Apartment[]> {
  let query = supabase.from("apartments").select("*")

  if (filters.minPrice) {
    query = query.gte("price_per_night", filters.minPrice)
  }

  if (filters.maxPrice) {
    query = query.lte("price_per_night", filters.maxPrice)
  }

  if (filters.guests) {
    query = query.gte("capacity", filters.guests)
  }

  if (filters.rooms) {
    query = query.gte("number_of_rooms", filters.rooms)
  }

  if (filters.location) {
    query = query.ilike("address", `%${filters.location}%`)
  }

  if (filters.amenities && filters.amenities.length > 0) {
    query = query.contains("amenities", filters.amenities)
  }

  const { data, error } = await query.order("created_at", { ascending: false })

  if (error) {
    console.error("Error searching apartments:", error)
    return []
  }

  // Filter out apartments that are booked during the requested dates
  if (filters.checkIn && filters.checkOut && data) {
    const availableApartments = []

    for (const apartment of data) {
      const { data: reservations } = await supabase
        .from("reservations")
        .select("*")
        .eq("apartment_id", apartment.id)
        .eq("status", "confirmed")
        .or(`check_in_date.lte.${filters.checkOut},check_out_date.gte.${filters.checkIn}`)

      if (!reservations || reservations.length === 0) {
        availableApartments.push(apartment)
      }
    }

    return availableApartments
  }

  return data || []
}

export async function createApartment(apartment: Omit<Apartment, "id" | "created_at" | "updated_at">) {
  const { data, error } = await supabase.from("apartments").insert([apartment]).select().single()

  if (error) throw error
  return data
}

export async function updateApartment(id: number, apartment: Partial<Apartment>) {
  const { data, error } = await supabase
    .from("apartments")
    .update({ ...apartment, updated_at: new Date().toISOString() })
    .eq("id", id)
    .select()
    .single()

  if (error) throw error
  return data
}

export async function deleteApartment(id: number) {
  const { error } = await supabase.from("apartments").delete().eq("id", id)
  if (error) throw error
}
