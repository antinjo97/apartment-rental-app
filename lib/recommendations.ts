import { supabase } from "./supabase"
import type { Recommendation } from "./supabase"

export async function getRecommendationsByApartmentId(apartmentId: number): Promise<Recommendation[]> {
  const { data, error } = await supabase
    .from("recommendations")
    .select("*")
    .eq("apartment_id", apartmentId)
    .order("category", { ascending: true })

  if (error) {
    console.error("Error fetching recommendations:", error)
    return []
  }

  return data || []
}

export async function createRecommendation(recommendation: Omit<Recommendation, "id">) {
  const { data, error } = await supabase.from("recommendations").insert([recommendation]).select().single()

  if (error) throw error
  return data
}

export async function deleteRecommendation(id: number) {
  const { error } = await supabase.from("recommendations").delete().eq("id", id)
  if (error) throw error
}
