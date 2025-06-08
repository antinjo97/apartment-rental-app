import { supabase } from "./supabase"

export async function signUp(email: string, password: string, role = "user") {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        role: role,
        full_name: "",
      },
    },
  })

  if (error) throw error

  // Dodaj korisnika u user_profiles tablicu
  if (data.user) {
    const { error: profileError } = await supabase.from("user_profiles").insert([
      {
        id: data.user.id,
        email: email,
        role: role,
        full_name: "",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
    ])

    if (profileError) {
      console.error("Error creating user profile:", profileError)
    }
  }

  return data
}

export async function signIn(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) throw error
  return data
}

export async function signOut() {
  const { error } = await supabase.auth.signOut()
  if (error) throw error
}

export async function getCurrentUser() {
  const {
    data: { user },
  } = await supabase.auth.getUser()
  return user
}

export async function resetPassword(email: string) {
  const { error } = await supabase.auth.resetPasswordForEmail(email)
  if (error) throw error
}

export async function updatePassword(newPassword: string) {
  const { error } = await supabase.auth.updateUser({
    password: newPassword,
  })
  if (error) throw error
}

export async function getUserProfile(userId: string) {
  const { data, error } = await supabase.from("user_profiles").select("*").eq("id", userId).single()

  if (error) throw error
  return data
}
