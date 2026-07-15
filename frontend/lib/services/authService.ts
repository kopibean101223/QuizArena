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

export const loginWithGoogle = async () => {
  const supabase = createBrowserSupabaseClient()
  
  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: 'http://localhost:3000/callback',
      queryParams: {
        prompt: 'select_account',
      },
    },
  })

  if (error) {
    throw error
  }
}

export async function getUserRole() {
  const supabase = createBrowserSupabaseClient()
  

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return null

  const { data: profile, error } = await supabase
    .from('profiles')
    .select('role')
    .eq('user_id', user.id)
    .single()

  if (error || !profile?.role) {
    return null 
  }

  return profile.role
}

export async function updateUserRole(role: 'student' | 'teacher') {
  const supabase = createBrowserSupabaseClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error("User not authenticated")

  const googleFullName = user.user_metadata?.full_name || user.user_metadata?.name || ''
  const firstName = googleFullName.split(' ')[0] || (user.email ? user.email.split('@')[0] : 'User')

  const { error } = await supabase
    .from('profiles')
    .upsert({ 
      user_id: user.id, 
      role: role,
      username: firstName,
      created_at: new Date().toISOString()
    })

  if (error) {
    throw new Error(error.message)
  }

  return role
}