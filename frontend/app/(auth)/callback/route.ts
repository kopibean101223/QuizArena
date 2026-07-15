
import { NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabase/server'

export async function GET(request: Request) {

  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')
  const origin = requestUrl.origin

  if (code) {
    const supabase = createServerSupabaseClient()
    
    const { data: authData, error: authError } = await supabase.auth.exchangeCodeForSession(code)
    
    if (!authError && authData.user) {
      
      const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('user_id', authData.user.id)
        .single()

      if (profile?.role === 'teacher') {
        return NextResponse.redirect(`${origin}/teacher-dashboard`)
      } else if (profile?.role === 'student') {
        return NextResponse.redirect(`${origin}/student-dashboard`)
      } else {
        
        return NextResponse.redirect(`${origin}/role`)
      }
    }
  }

  return NextResponse.redirect(`${origin}/login?error=Authentication-Failed`)
}