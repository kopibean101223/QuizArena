"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { updateUserRole } from '@/lib/services/authService'

export default function ChooseRolePage() {
  const router = useRouter()
  const [isUpdating, setIsUpdating] = useState(false)

  const handleRoleSelection = async (selectedRole: 'student' | 'teacher') => {
    setIsUpdating(true)
    try {
      await updateUserRole(selectedRole) 
      
      if (selectedRole === 'teacher') {
        router.push('/teacher-dashboard')
      } else {
        router.push('/student-dashboard')
      }
    } catch (error) {
      console.error("Failed to update role", error)
      setIsUpdating(false)
    }
  }

  return (
    <div className="flex h-screen items-center justify-center bg-gray-50 p-4">
      <div className="bg-white p-8 rounded-2xl shadow-lg max-w-md w-full text-center border border-gray-100">
        <h2 className="text-2xl font-bold text-[#0F172A] mb-2">Welcome to QuizArena!</h2>
        <p className="text-[#64748B] mb-6 text-sm">Choose your path to finish setting up your account.</p>
        
        <div className="space-y-3">
          <button 
            onClick={() => handleRoleSelection('student')}
            disabled={isUpdating}
         className="w-full py-12 bg-[url('/jaja.jpg')] bg-cover bg-center text-white rounded-xl font-bold transition-all hover:opacity-90 disabled:opacity-70 shadow-md">
            {isUpdating ? 'Setting up...' : 'I am a Student'}
          </button>
          
          <button 
            onClick={() => handleRoleSelection('teacher')}
            disabled={isUpdating}
         className="w-full py-12 bg-[url('/ received.jpg')] bg-cover bg-center text-white rounded-xl font-bold transition-all hover:opacity-90 disabled:opacity-70 shadow-md" >
            {isUpdating ? 'Setting up...' : 'I am a Teacher'}
          </button>
        </div>
      </div>
    </div>
  )
}
