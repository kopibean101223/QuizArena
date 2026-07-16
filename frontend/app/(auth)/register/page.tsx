"use client";

import React, { useState, ChangeEvent, FormEvent } from 'react';
import AuthLayout from '../../../components/AuthLayout';
import { useRouter } from 'next/navigation'
import { createBrowserSupabaseClient } from '@/lib/supabase/client'

export default function QuizArenaSignUp() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
    role: 'student', // 'student' or 'professor'
    agreeTerms: false,
    agreePrivacy: false,
  });
const router = useRouter();

  const [showSuccess, setShowSuccess] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const getPasswordStrength = (pwd: string) => {
    if (!pwd) return { label: 'EMPTY', color: 'bg-gray-200', textClass: 'text-gray-400', width: 'w-0' };
    if (pwd.length < 5) return { label: 'WEAK', color: 'bg-red-500', textClass: 'text-red-500', width: 'w-1/3' };
    if (pwd.length >= 5 && pwd.length < 8) return { label: 'MEDIUM', color: 'bg-emerald-500', textClass: 'text-emerald-500', width: 'w-2/3' };
    return { label: 'STRONG', color: 'bg-green-600', textClass: 'text-green-600', width: 'w-full' };
  };

  const strength = getPasswordStrength(formData.password);
  const passwordsMatch = formData.password && formData.password === formData.confirmPassword;

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.agreeTerms || !formData.agreePrivacy) return;
    if (formData.password !== formData.confirmPassword) return;

    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 5000);
  };

  return (
    <AuthLayout>
      {/* SIGN UP CARD */}
      <div className="relative z-10 w-full max-w-lg bg-white rounded-[24px] shadow-2xl shadow-indigo-100 border border-slate-50 p-6 sm:p-10 my-8">
        
        {showSuccess && (
          <div className="mb-6 p-4 rounded-xl bg-green-50 border border-green-200 text-green-800 text-sm animate-fade-in-down">
            <strong>Success!</strong> Your QuizArena account has been successfully generated.
          </div>
        )}

        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-800 text-center tracking-tight mb-8">
          Create Your QuizArena Account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          
          {/* Full Name */}
          <div>
            <label className="form-label">Full Name:</label>
            <input
              type="text"
              name="fullName"
              required
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Enter your full name..."
              className="form-input"
            />
          </div>

          {/* Email Address */}
          <div>
            <label className="form-label">Email Address:</label>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email..."
              className="form-input"
            />
          </div>

          {/* Username */}
          <div>
            <label className="form-label">Username:</label>
            <input
              type="text"
              name="username"
              required
              value={formData.username}
              onChange={handleChange}
              placeholder="Choose a username..."
              className="form-input"
            />
          </div>

          {/* Password */}
          <div>
            <label className="form-label">Password:</label>
            <input
              type="password"
              name="password"
              required
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              className="form-input tracking-wider"
            />
            
            {/* Password Strength Indicator */}
            <div className="mt-2.5">
              <div className="flex justify-between items-center text-[10px] font-bold tracking-wide uppercase mb-1">
                <span className="text-slate-400">Password strength:</span>
                <span className={strength.textClass}>{strength.label}</span>
              </div>
              <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                <div className={`h-full ${strength.color} ${strength.width} transition-all duration-300 rounded-full`} />
              </div>
            </div>
          </div>

          {/* Confirm Password */}
          <div>
            <label className="form-label">Confirm Password:</label>
            <input
              type="password"
              name="confirmPassword"
              required
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="••••••••"
              className={`form-input tracking-wider ${
                formData.confirmPassword 
                  ? passwordsMatch 
                    ? 'form-input-match' 
                    : 'form-input-mismatch'
                  : ''
              }`}
            />
            {formData.confirmPassword && !passwordsMatch && (
              <p className="mt-1 text-[11px] font-medium text-red-500">Passwords do not match yet.</p>
            )}
          </div>

          {/* Role Selection */}
          <div>
            <label className="form-label mb-2">Role:</label>
            <div className="flex items-center gap-6">
              {['student', 'professor'].map((roleType) => (
                <label key={roleType} className="flex items-center gap-2.5 cursor-pointer group">
                  <div className="relative flex items-center justify-center">
                    <input
                      type="radio"
                      name="role"
                      value={roleType}
                      checked={formData.role === roleType}
                      onChange={handleChange}
                      className="sr-only"
                    />
                    <div className={`h-5 w-5 rounded-full border flex items-center justify-center transition-all ${
                      formData.role === roleType ? 'border-indigo-600 bg-white' : 'border-gray-300 bg-white group-hover:border-indigo-400'
                    }`}>
                      {formData.role === roleType && (
                        <div className="h-2.5 w-2.5 rounded-full bg-indigo-600" />
                      )}
                    </div>
                  </div>
                  <span className="text-sm font-semibold text-slate-600 capitalize">{roleType}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Agreements Checkboxes */}
          <div className="space-y-2.5 pt-2">
            {[
              { key: 'agreeTerms', text: 'Terms of Service' },
              { key: 'agreePrivacy', text: 'Privacy Policy' }
            ].map((item) => {
              const isChecked = formData[item.key as keyof typeof formData] as boolean;
              
              return (
                <label key={item.key} className="flex items-start gap-3 cursor-pointer group">
                  <div className="relative mt-0.5">
                    <input
                      type="checkbox"
                      name={item.key}
                      required
                      checked={isChecked}
                      onChange={handleChange}
                      className="sr-only"
                    />
                    <div className={`h-4 w-4 rounded border flex items-center justify-center transition-all ${
                      isChecked ? 'bg-indigo-600 border-indigo-600' : 'border-gray-300 group-hover:border-indigo-400'
                    }`}>
                      {isChecked && (
                        <svg className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="4">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </div>
                  </div>
                  <span className="text-xs font-semibold text-slate-500 leading-tight">
                    I agree to the <span className="text-indigo-600 hover:underline">{item.text}</span>
                  </span>
                </label>
              );
            })}
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <button type="submit" className="btn-submit">
              Create Account
            </button>
          </div>

        </form>

        <div className="mt-6 text-center">
          <p className="text-xs text-gray-500">
            Don't have an account?{' '}
            <button 
              onClick={() => router.push('/login')} // Regster PAGE here
              className="text-[#3A2DD3] hover:underline font-medium"
            >
              Create Account
            </button>
          </p>
        </div>

      </div>
    </AuthLayout>
  );
}