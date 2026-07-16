import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export default async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          request.cookies.set({ name, value, ...options })
          response = NextResponse.next({
            request: { headers: request.headers },
          })
          response.cookies.set({ name, value, ...options })
        },
        remove(name: string, options: CookieOptions) {
          request.cookies.set({ name, value: '', ...options })
          response = NextResponse.next({
            request: { headers: request.headers },
          })
          response.cookies.set({ name, value: '', ...options })
        },
      },
    }
  )

  const { data: { user } } = await supabase.auth.getUser()

  const url = request.nextUrl.clone()
  const isAuthRoute = url.pathname === '/login' || url.pathname === '/register'
  const isRoleRoute = url.pathname === '/role'

 
  if (!user && !isAuthRoute) {
    url.pathname = '/login'
    return NextResponse.redirect(url)
  }

  
  if (user) {
    
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('user_id', user.id)
      .maybeSingle()


    if (!profile) {
      if (!isRoleRoute) {
        url.pathname = '/role'
        return NextResponse.redirect(url)
      }
      return response 
    }
    if (profile && isRoleRoute) {
      url.pathname = profile.role === 'teacher' ? '/teacher-dashboard' : 
                     profile.role === 'student' ? '/student-dashboard' : '/dashboard'
      return NextResponse.redirect(url)
    }

    if (url.pathname.startsWith('/teacher-dashboard') && profile.role !== 'teacher') {
      url.pathname = profile.role === 'student' ? '/student-dashboard' : '/dashboard'
      url.searchParams.set('error', 'unauthorized_teacher')
      return NextResponse.redirect(url)
    }

    if (url.pathname.startsWith('/student-dashboard') && profile.role !== 'student') {
      url.pathname = profile.role === 'teacher' ? '/teacher-dashboard' : '/dashboard'
      url.searchParams.set('error', 'unauthorized_student')
      return NextResponse.redirect(url)
    }


    if (isAuthRoute) {
      url.pathname = profile.role === 'teacher' ? '/teacher-dashboard' : 
                     profile.role === 'student' ? '/student-dashboard' : '/dashboard'
      return NextResponse.redirect(url)
    }
  }

  return response
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|api/backend|callback|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}