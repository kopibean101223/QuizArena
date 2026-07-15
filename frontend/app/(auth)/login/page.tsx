"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { loginUserAndFetchRole } from '@/lib/services/authService' 
import { createBrowserSupabaseClient } from '@/lib/supabase/client'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isGoogleLoading, setIsGoogleLoading] = useState(false)
  
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      
      const role = await loginUserAndFetchRole(email, password)
      
     
      if (role?.toLowerCase() === 'teacher') {
        router.push('/teacher-dashboard')
      } else if (role?.toLowerCase() === 'student') {
        router.push('/student-dashboard')
      } else {
        router.push('/dashboard') 
      }
      
      router.refresh() 
    } catch (err: any) {
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleLogin = async () => {
    setIsGoogleLoading(true)
    const supabase = createBrowserSupabaseClient()
    
 
    
  }

  return (
 
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      

      <div className="w-full max-w-[420px] bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-8 relative z-10 border border-gray-100">
        
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Welcome Back to QuizArena!</h1>
          <p className="text-gray-400 mt-1.5 text-xs">AI-Powered Gamified Quiz Battle System</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-gray-700">Email or Username:</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-gray-900 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#4A3AFF]/50 focus:border-[#4A3AFF] transition-all"
              placeholder="Enter email or username..."
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-gray-700">Password:</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-gray-900 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#4A3AFF]/50 focus:border-[#4A3AFF] transition-all"
              placeholder="••••••••"
            />
          </div>

          <div className="flex items-center justify-between mt-2">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input type="checkbox" className="rounded border-gray-300 text-[#4A3AFF] focus:ring-[#4A3AFF]" />
              <span className="text-xs text-gray-500">Remember me</span>
            </label>
            <button 
              type="button" 
              onClick={() => router.push('/forgot-password')} // 👈 Placeholder Route
              className="text-xs text-gray-500 hover:text-gray-700 transition-colors"
            >
              Forgot Password?
            </button>
          </div>

          {error && (
            <div className="p-2.5 rounded-lg bg-red-50 text-red-600 text-xs text-center border border-red-100">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading || isGoogleLoading}
            className="w-full py-3 mt-2 rounded-lg bg-[#3A2DD3] hover:bg-[#3226B8] text-white text-sm font-semibold transition-all disabled:opacity-70"
          >
            {isLoading ? 'Logging in...' : 'LOGIN'}
          </button>
        </form>

        <div className="flex items-center my-6">
          <div className="flex-grow border-t border-gray-100"></div>
          <span className="px-3 text-[10px] text-gray-400 font-medium uppercase tracking-wider">OR</span>
          <div className="flex-grow border-t border-gray-100"></div>
        </div>

  
        <button
          type="button"
          onClick={handleGoogleLogin}
          disabled={isLoading || isGoogleLoading}
          className="w-full flex items-center justify-center space-x-2 py-2.5 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-70"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
          </svg>
          <span className="text-sm font-medium text-gray-600">
            {isGoogleLoading ? 'Redirecting...' : 'Sign in with Google'}
          </span>
        </button>

        <div className="mt-6 text-center">
          <p className="text-xs text-gray-500">
            Don't have an account?{' '}
            <button 
              onClick={() => router.push('/register')} // Regster PAGE here
              className="text-[#3A2DD3] hover:underline font-medium"
            >
              Create Account
            </button>
          </p>
        </div>

      </div>
    </div>
  )
}