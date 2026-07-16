"use client";

import React, { useState } from 'react';
import Navbar from '@/components/student/navbar';
import Footer from '@/components/student/footer';

export default function StudentDashboard() {
  const [timeRange, setTimeRange] = useState('Last 30 Days');
  const [leaderboardTab, setLeaderboardTab] = useState<'overall' | 'class'>('overall');

  // Stats cards data
  const stats = [
    {
      title: 'Current Rank',
      value: 'Gold III',
      badge: '+3',
      badgeColor: 'text-[#10B981] bg-[#ECFDF5]',
      icon: (
        <svg className="w-5 h-5 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 002 2h2a2 2 0 002-2z" />
        </svg>
      ),
      iconBg: 'bg-indigo-50',
    },  
    {
      title: 'Win Rate',
      value: '78.4%',
      badge: 'Top 5%',
      badgeColor: 'text-emerald-700 bg-emerald-50',
      icon: (
        <svg className="w-5 h-5 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      iconBg: 'bg-emerald-50',
    },
    {
      title: 'Arena Points',
      value: '12,450',
      badge: null,
      badgeColor: '',
      icon: (
        <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5a2 2 0 10-2 2h2zm0 0h4m-4 0H8m12 9a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ),
      iconBg: 'bg-blue-50',
    },
    {
      title: 'Day Streak',
      value: '14 Days',
      badge: null,
      badgeColor: '',
      icon: (
        <svg className="w-5 h-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      iconBg: 'bg-red-50',
    },
  ];

  // Sections progress
  const activeSections = [
    { name: 'Advanced Machine Learning', progress: 85, next: 'Neural Nets', iconColor: 'bg-indigo-100' },
    { name: 'Modern Web Architecture', progress: 42, next: 'API Security', iconColor: 'bg-sky-100' },
    { name: 'Data Structures & Algos', progress: 12, next: 'Graph Theory', iconColor: 'bg-emerald-100' },
  ];

  // Activity pulse graph bar heights (emulating the design's raw visual data)
  const activityGraphBars = [35, 60, 80, 50, 42, 68, 30, 55, 12, 90, 20, 60, 25, 38, 72, 35, 15, 75, 45, 65];

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
      <Navbar />

      {/* MAIN CONTAINER */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-8 space-y-8">
        
        {/* HERO AREA BANNER */}
        <div className="relative w-full rounded-3xl bg-[#3B30D1] text-white p-6 sm:p-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8 overflow-hidden shadow-xl shadow-indigo-100">
          {/* Subtle background overlay shapes */}
          <div className="absolute right-0 top-0 bottom-0 w-1/2 opacity-10 pointer-events-none">
            <svg viewBox="0 0 400 400" className="w-full h-full object-cover">
              <circle cx="250" cy="150" r="120" fill="white" />
              <circle cx="300" cy="250" r="150" fill="white" />
            </svg>
          </div>

          {/* Left Text */}
          <div className="relative z-10 space-y-4 max-w-xl">
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-bold tracking-wider bg-white/10 text-[#A5B4FC] uppercase">
              Academic Gladiator
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Welcome Back, Julian.
            </h1>
            <p className="text-sm text-slate-200 leading-relaxed font-medium">
              Your arena is ready. You&apos;ve climbed 12 places since yesterday. Time to secure your throne in the colosseum.
            </p>
          </div>

          {/* Right Timer Widget */}
          <div className="relative z-10 flex-shrink-0 bg-indigo-950/40 backdrop-blur-md rounded-2xl p-5 border border-white/10 w-full sm:w-80">
            <div className="flex items-center gap-2 text-[#4ADE80] font-bold text-xs uppercase tracking-wider mb-4">
              <svg className="w-4 h-4 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Next Battle Starts In
            </div>

            {/* Countdown timers */}
            <div className="grid grid-cols-3 gap-3 text-center mb-5">
              {[
                { value: '02', label: 'HRS' },
                { value: '45', label: 'MIN' },
                { value: '16', label: 'SEC' }
              ].map((time, idx) => (
                <div key={idx} className="relative">
                  <div className="text-2xl font-black text-white leading-none">
                    {time.value}
                  </div>
                  <span className="text-[10px] font-bold text-slate-400 block mt-1 tracking-wider">
                    {time.label}
                  </span>
                  {idx < 2 && (
                    <span className="absolute right-[-8px] top-1 text-white/50 text-xl font-light">:</span>
                  )}
                </div>
              ))}
            </div>

            <button className="w-full py-3 px-4 bg-[#63F6B5] hover:bg-[#4fe5a1] text-indigo-950 font-extrabold text-sm rounded-xl transition-all shadow-lg shadow-emerald-500/20 active:scale-98">
              Ready Up
            </button>
          </div>
        </div>

        {/* FOUR STATS CARDS */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, i) => (
            <div key={i} className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm flex flex-col justify-between h-32 relative overflow-hidden group hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between">
                <div className={`${stat.iconBg} p-2.5 rounded-xl flex items-center justify-center`}>
                  {stat.icon}
                </div>
                {stat.badge && (
                  <span className={`px-2 py-0.5 rounded text-[10px] font-extrabold ${stat.badgeColor}`}>
                    {stat.badge}
                  </span>
                )}
              </div>
              <div>
                <span className="text-xs font-bold text-slate-400 block tracking-wide uppercase">
                  {stat.title}
                </span>
                <span className="text-lg sm:text-xl font-black text-slate-800 mt-0.5 block">
                  {stat.value}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* MIDDLE SECTION: ACTIVE SECTIONS & INCOMING BATTLES */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Active Sections column (Takes 2/3 space) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-extrabold text-slate-800 flex items-center gap-2">
                <svg className="w-5 h-5 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                My Active Sections
              </h2>
              <button className="text-xs font-bold text-indigo-600 hover:underline">
                View All
              </button>
            </div>

            <div className="space-y-3">
              {activeSections.map((sec, idx) => (
                <div key={idx} className="bg-white p-4 rounded-2xl border border-slate-50 shadow-sm flex items-center justify-between gap-4 hover:border-slate-200 transition-colors">
                  <div className="flex items-center gap-4 min-w-0">
                    <div className={`w-12 h-12 rounded-xl flex-shrink-0 ${sec.iconColor} flex items-center justify-center`}>
                      <svg className="w-5 h-5 text-indigo-950/70" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-sm font-extrabold text-slate-800 truncate">
                        {sec.name}
                      </h3>
                      <p className="text-[11px] font-bold text-slate-400 mt-1">
                        Next: <span className="text-slate-600">{sec.next}</span>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 flex-shrink-0">
                    <div className="text-right hidden sm:block">
                      <span className="text-xs font-extrabold text-indigo-600">
                        {sec.progress}% Complete
                      </span>
                      {/* Clean raw CSS Progress line */}
                      <div className="w-32 h-1.5 bg-slate-100 rounded-full mt-1.5 overflow-hidden">
                        <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${sec.progress}%` }} />
                      </div>
                    </div>
                    
                    <button className="h-8 w-8 rounded-full bg-slate-50 hover:bg-indigo-50 hover:text-indigo-600 text-slate-400 flex items-center justify-center transition-colors">
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Incoming Battles column (Takes 1/3 space) */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-extrabold text-slate-800 flex items-center gap-2">
                <svg className="w-5 h-5 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Incoming Battles
              </h2>
              <span className="text-[10px] font-black text-slate-400 tracking-wider">
                5 UPCOMING
              </span>
            </div>

            <div className="space-y-4">
              {/* Battle 1 (Active Interactive Button) */}
              <div className="bg-white p-5 rounded-2xl border border-slate-50 shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-black tracking-wider bg-[#ECFDF5] text-emerald-600 uppercase">
                    Speed Mode
                  </span>
                </div>
                <div>
                  <h4 className="text-sm font-extrabold text-slate-800">
                    Swift 5.0 Challenge
                  </h4>
                  <div className="flex items-center gap-1.5 text-xs font-bold text-indigo-600 mt-2">
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Today, 4:00 PM
                  </div>
                </div>
                <button className="w-full py-2.5 text-xs font-bold bg-[#1D09A3] hover:bg-indigo-900 text-white rounded-xl transition-all shadow-sm">
                  Take Quiz
                </button>
              </div>

              {/* Battle 2 */}
              <div className="bg-white p-5 rounded-2xl border border-slate-50 shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-black tracking-wider bg-indigo-50 text-indigo-600 uppercase">
                    Team Clash
                  </span>
                </div>
                <div>
                  <h4 className="text-sm font-extrabold text-slate-800">
                    OS Fundamentals
                  </h4>
                  <div className="flex items-center gap-1.5 text-xs font-bold text-slate-500 mt-2">
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Tomorrow, 10:00 AM
                  </div>
                </div>
                <button className="w-full py-2.5 text-xs font-bold bg-indigo-50 hover:bg-indigo-100/85 text-indigo-950 rounded-xl transition-all">
                  Set Reminder
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* BOTTOM SECTION: ACTIVITY PULSE & STANDINGS */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Activity Pulse Column (Takes 2/3 space) */}
          <div className="lg:col-span-2 bg-[#F3F4FE] p-6 rounded-3xl border border-slate-50 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-extrabold text-slate-800">
                  Activity Pulse
                </h3>
                <p className="text-xs font-semibold text-slate-400 mt-0.5">
                  Your learning intensity over the last 30 days
                </p>
              </div>

              {/* Timeframe Dropdown */}
              <div className="relative">
                <select 
                  value={timeRange} 
                  onChange={(e) => setTimeRange(e.target.value)}
                  className="appearance-none bg-white border border-slate-100 rounded-xl px-4 py-2 pr-8 text-xs font-bold text-slate-700 shadow-sm outline-none focus:ring-2 focus:ring-indigo-200 cursor-pointer"
                >
                  <option>Last 30 Days</option>
                  <option>Last 7 Days</option>
                  <option>This Semester</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-slate-500">
                  <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Simulated Custom Bar Chart */}
            <div className="h-44 flex items-end justify-between gap-1.5 pt-4">
              {activityGraphBars.map((height, idx) => {
                const isHighest = height === Math.max(...activityGraphBars);
                return (
                  <div key={idx} className="flex-1 flex flex-col items-center group h-full justify-end">
                    {/* Hover Tooltip */}
                    <div className="opacity-0 group-hover:opacity-100 absolute bg-indigo-950 text-white text-[10px] font-bold py-1 px-1.5 rounded mb-2 transition-opacity pointer-events-none transform -translate-y-12">
                      {height}%
                    </div>
                    {/* Bar styling */}
                    <div 
                      className={`w-full rounded-full transition-all duration-300 ${
                        isHighest ? 'bg-[#483CD8]' : 'bg-[#C2C5F9]'
                      } group-hover:opacity-80`} 
                      style={{ height: `${height}%` }}
                    />
                  </div>
                );
              })}
            </div>
          </div>

          {/* Standings/Leaderboard Card (Takes 1/3 space) */}
          <div className="bg-[#1D10C5] text-white rounded-3xl p-6 flex flex-col justify-between shadow-xl shadow-indigo-200/50 relative overflow-hidden">
            
            <div className="space-y-6">
              <h3 className="text-sm font-extrabold tracking-wide">
                Standings
              </h3>

              {/* Sub-tabs toggle */}
              <div className="grid grid-cols-2 bg-[#120593] rounded-xl p-1 text-center">
                <button 
                  onClick={() => setLeaderboardTab('overall')}
                  className={`py-1.5 text-xs font-bold rounded-lg transition-all ${
                    leaderboardTab === 'overall' ? 'bg-white/10 text-white' : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Overall
                </button>
                <button 
                  onClick={() => setLeaderboardTab('class')}
                  className={`py-1.5 text-xs font-bold rounded-lg transition-all ${
                    leaderboardTab === 'class' ? 'bg-white/10 text-white' : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Class
                </button>
              </div>

              {/* Leaderboard entries */}
              <div className="space-y-2">
                {[
                  { rank: '01', name: 'Alex Chen', points: '18.2k', style: 'text-[#94A3B8]' },
                  { rank: '02', name: 'Sarah Jenkins', points: '17.8k', style: 'text-[#94A3B8]' },
                  { rank: '12', name: 'You', points: '12.4k', style: 'bg-white/15 rounded-xl px-3 border border-white/10' }
                ].map((player, idx) => {
                  const isCurrentPlayer = player.name === 'You';
                  return (
                    <div 
                      key={idx} 
                      className={`flex items-center justify-between py-2 text-xs font-bold ${
                        isCurrentPlayer ? player.style : 'px-3'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className={isCurrentPlayer ? 'text-[#63F6B5]' : 'text-slate-400'}>
                          {player.rank}
                        </span>
                        <span>{player.name}</span>
                      </div>
                      <span className="text-slate-300 font-extrabold">
                        {player.points}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Action Footer Button */}
            <button className="w-full py-3 mt-6 border border-white/20 hover:bg-white/10 text-xs font-extrabold rounded-xl transition-colors tracking-wide">
              Full Leaderboard
            </button>
          </div>

        </div>

      </main>

      <Footer />
    </div>
  );
}