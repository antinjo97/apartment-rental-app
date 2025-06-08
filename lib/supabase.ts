import { createClient } from "@supabase/supabase-js"

const supabaseUrl = "https://jkbumhwexijqcmqtvadb.supabase.co"
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImprYnVtaHdleGlqcWNtcXR2YWRiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDkzMDc0OTksImV4cCI6MjA2NDg4MzQ5OX0.ReAS23vgaKDyGQfoxtEOJVNcfEtxp8lGr3nlkQTpgSk"

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export interface Apartment {
  id: number
  title: string
  description: string
  address: string
  price_per_night: number
  number_of_rooms: number
  capacity: number
  amenities: string[]
  images: string[]
  owner_id: string
  created_at: string
  updated_at: string
  instagram_url?: string
  facebook_url?: string
  latitude?: number
  longitude?: number
}

export interface Reservation {
  id: number
  apartment_id: number
  user_id: string
  guest_name: string
  guest_email: string
  guest_phone?: string
  check_in_date: string
  check_out_date: string
  number_of_guests: number
  total_price: number
  status: "pending" | "confirmed" | "cancelled"
  created_at: string
  updated_at: string
  apartment?: Apartment
}

export interface UserProfile {
  id: string
  email: string
  full_name: string
  role: "user" | "admin" | "super_admin"
  created_at: string
  updated_at: string
}

export interface BlockedDate {
  id: number
  apartment_id: number
  start_date: string
  end_date: string
  reason: string
  created_at: string
  updated_at: string
}
