import { supabase } from "./supabase"
import type { Reservation } from "./supabase"

export async function createReservation(reservation: Omit<Reservation, "id" | "created_at" | "updated_at">) {
  try {
    console.log("Creating reservation with data:", reservation)

    const { data, error } = await supabase.from("reservations").insert([reservation]).select().single()

    if (error) {
      console.error("Supabase error:", error)
      throw new Error(`Database error: ${error.message}`)
    }

    console.log("Reservation created successfully:", data)
    return data
  } catch (error) {
    console.error("Error in createReservation:", error)
    throw error
  }
}

export async function getReservations(): Promise<Reservation[]> {
  try {
    const { data, error } = await supabase
      .from("reservations")
      .select(`
        *,
        apartment:apartments(*)
      `)
      .order("created_at", { ascending: false })

    if (error) {
      console.error("Error fetching reservations:", error)
      throw new Error(`Failed to fetch reservations: ${error.message}`)
    }

    return data || []
  } catch (error) {
    console.error("Error in getReservations:", error)
    return []
  }
}

export async function getReservationsByUserId(userId: string): Promise<Reservation[]> {
  try {
    const { data, error } = await supabase
      .from("reservations")
      .select(`
        *,
        apartment:apartments(*)
      `)
      .eq("user_id", userId)
      .order("created_at", { ascending: false })

    if (error) {
      console.error("Error fetching user reservations:", error)
      throw new Error(`Failed to fetch user reservations: ${error.message}`)
    }

    return data || []
  } catch (error) {
    console.error("Error in getReservationsByUserId:", error)
    return []
  }
}

export async function updateReservationStatus(id: number, status: "pending" | "confirmed" | "cancelled") {
  try {
    const { data, error } = await supabase
      .from("reservations")
      .update({ status, updated_at: new Date().toISOString() })
      .eq("id", id)
      .select(`
        *,
        apartment:apartments(*)
      `)
      .single()

    if (error) {
      console.error("Error updating reservation status:", error)
      throw new Error(`Failed to update reservation: ${error.message}`)
    }

    return data
  } catch (error) {
    console.error("Error in updateReservationStatus:", error)
    throw error
  }
}

export async function deleteReservation(id: number) {
  try {
    const { error } = await supabase.from("reservations").delete().eq("id", id)

    if (error) {
      console.error("Error deleting reservation:", error)
      throw new Error(`Failed to delete reservation: ${error.message}`)
    }
  } catch (error) {
    console.error("Error in deleteReservation:", error)
    throw error
  }
}

export async function getApartmentAvailability(apartmentId: number, checkIn: string, checkOut: string) {
  try {
    console.log("Checking availability for:", { apartmentId, checkIn, checkOut })

    // Provjeri rezervacije
    const { data: reservations, error: reservationError } = await supabase
      .from("reservations")
      .select("*")
      .eq("apartment_id", apartmentId)
      .eq("status", "confirmed")
      .or(`check_in_date.lte.${checkOut},check_out_date.gte.${checkIn}`)

    if (reservationError) {
      console.error("Error checking reservations:", reservationError)
      throw new Error(`Failed to check reservations: ${reservationError.message}`)
    }

    // Provjeri blokirane datume
    const { data: blockedDates, error: blockedError } = await supabase
      .from("blocked_dates")
      .select("*")
      .eq("apartment_id", apartmentId)
      .or(`start_date.lte.${checkOut},end_date.gte.${checkIn}`)

    if (blockedError) {
      console.error("Error checking blocked dates:", blockedError)
      // Ne prekidamo proces ako tablica ne postoji
    }

    const hasConflictingReservations = reservations.length > 0
    const hasBlockedDates = blockedDates && blockedDates.length > 0
    const isAvailable = !hasConflictingReservations && !hasBlockedDates

    console.log("Availability result:", {
      conflictingReservations: reservations.length,
      blockedDates: blockedDates?.length || 0,
      isAvailable,
    })

    return isAvailable
  } catch (error) {
    console.error("Error in getApartmentAvailability:", error)
    // Vraćamo false u slučaju greške za sigurnost
    return false
  }
}
