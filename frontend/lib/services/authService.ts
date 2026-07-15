import { createBrowserSupabaseClient } from '@/lib/supabase/client'

export async function loginUserAndFetchRole(email: string, password: string) {
  const supabase = createBrowserSupabaseClient()
  

  const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (authError) {
    throw new Error(authError.message)
  }


  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('role')
    .eq('user_id', authData.user.id)
    .single()

  if (profileError) {
    throw new Error("Profile not found or role missing.")
  }

  return profile.role 
}