"use client";

import React, { useState } from "react";
import Navbar from "@/components/student/navbar";
import Footer from "@/components/student/footer";
import QuizOptions, { QuizOptionItem } from "@/components/student/speedmode/questions";

export default function TakeQuizPage() {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const options: QuizOptionItem[] = [
    { id: "A", value: "10" },
    { id: "B", value: "25" },
    { id: "C", value: "32" },
    { id: "D", value: "120" },
  ];

  const liveRankings = [
    { rank: "#1", name: "Elena K.", initials: "EK", score: "3,120", progress: "6/20", color: "text-emerald-500" },
    { rank: "#2", name: "Marcus J.", initials: "MJ", score: "2,850", progress: "6/20", color: "text-indigo-600" },
    { rank: "#3", name: "You", initials: "You", score: "2,450", progress: "5/20", color: "text-indigo-800 font-bold", isUser: true },
    { rank: "#4", name: "Alex C.", initials: "AC", score: "2,100", progress: "5/20", color: "text-slate-500" },
    { rank: "#5", name: "Sarah L.", initials: "SL", score: "1,950", progress: "4/20", color: "text-slate-500" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
      <Navbar />

      {/* MAIN CONTAINER */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-8 space-y-6">
        
        {/* TOP LAYOUT: QUIZ INTERACTIVE CARD & SCORE/FEED COLUMN */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          
          {/* LEFT CONTAINER: Interactive Quiz Card (Takes 2/3 space) */}
          <div className="lg:col-span-2 bg-white rounded-3xl border border-slate-100 shadow-sm p-6 sm:p-8 space-y-6">
            
            {/* Card Header */}
            <div className="flex items-center justify-between">
              <span className="px-3.5 py-1.5 rounded-full text-xs font-black tracking-wide bg-indigo-50 text-[#483CD8]">
                Question 5 of 20
              </span>
              <div className="flex items-center gap-1.5 text-xs font-bold text-slate-500">
                <svg className="w-4 h-4 text-indigo-500 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                +500 pts possible
              </div>
            </div>

            {/* Question Title */}
            <h1 className="text-base sm:text-lg font-black text-slate-800 leading-snug">
              What is the cardinality of the power set of a set with 5 elements?
            </h1>

            {/* Modular Choices Component */}
            <QuizOptions 
              options={options} 
              selectedOption={selectedOption} 
              onSelectOption={setSelectedOption} 
            />

            {/* Submit Button */}
            <div className="pt-2">
              <button className="w-full py-4 bg-[#1D09A3] hover:bg-indigo-900 active:scale-98 text-white font-extrabold text-sm rounded-2xl flex items-center justify-center gap-2 transition-all shadow-md">
                Submit Answer
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            </div>

          </div>

          {/* RIGHT CONTAINER: Dashboard Metrics & Activity (Takes 1/3 space) */}
          <div className="space-y-6">
            
            {/* Score Card */}
            <div className="bg-[#1D10C5] text-white rounded-3xl p-6 shadow-xl shadow-indigo-100 relative overflow-hidden">
              <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none">
                <svg width="150" height="150" viewBox="0 0 100 100" fill="currentColor">
                  <path d="M50 15L85 85H15L50 15Z" />
                </svg>
              </div>

              <span className="text-[10px] font-black tracking-wider text-indigo-300 uppercase block">
                Your Current Score
              </span>
              <h2 className="text-4xl sm:text-5xl font-black tracking-tight mt-1">
                2,450
              </h2>

              {/* Status Pills */}
              <div className="grid grid-cols-2 gap-3 mt-6">
                <div className="bg-[#120593]/60 border border-white/5 rounded-xl p-3 flex flex-col justify-center">
                  <div className="flex items-center gap-1 text-[10px] font-bold text-slate-300 uppercase tracking-wide">
                    <svg className="w-3.5 h-3.5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Accuracy
                  </div>
                  <span className="text-sm font-extrabold text-emerald-400 mt-1">95%</span>
                </div>

                <div className="bg-[#120593]/60 border border-white/5 rounded-xl p-3 flex flex-col justify-center">
                  <div className="flex items-center gap-1 text-[10px] font-bold text-slate-300 uppercase tracking-wide">
                    <svg className="w-3.5 h-3.5 text-amber-400 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    Streak
                  </div>
                  <span className="text-sm font-extrabold text-amber-400 mt-1">5 <span className="text-xs font-semibold text-slate-300">in a row</span></span>
                </div>
              </div>
            </div>

            {/* Live Feed Column */}
            <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 space-y-4">
              <div className="flex items-center justify-between pb-1">
                <h3 className="text-sm font-extrabold text-slate-800 flex items-center gap-2">
                  <svg className="w-4 h-4 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5.05 3.654a1 1 0 011.414 0c1.848 1.848 1.848 4.846 0 6.694a1 1 0 01-1.414-1.414 2.828 2.828 0 000-4c-.38-.38-.38-1.024 0-1.405zm12.486 0a1 1 0 010 1.414 2.828 2.828 0 000 4c.38.38.38 1.024 0 1.414a1 1 0 01-1.414 0 4.829 4.829 0 010-6.694 1 1 0 011.414 0zM12 11a3 3 0 100-6 3 3 0 000 6z" />
                  </svg>
                  Live Feed
                </h3>
                <span className="h-2 w-2 bg-emerald-500 rounded-full animate-pulse" />
              </div>

              {/* Feed Activity List */}
              <div className="space-y-4">
                {[
                  {
                    icon: (
                      <div className="bg-emerald-50 p-1.5 rounded-full">
                        <svg className="w-3.5 h-3.5 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    ),
                    text: <p className="text-xs text-slate-500"><strong className="text-slate-700">Alex Chen</strong> got Question 4 right!</p>,
                    time: "Just now",
                  },
                  {
                    icon: (
                      <div className="bg-indigo-50 p-1.5 rounded-full">
                        <svg className="w-3.5 h-3.5 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                        </svg>
                      </div>
                    ),
                    text: <p className="text-xs text-slate-500"><strong className="text-slate-700">Elena K.</strong> reached a 10 streak!</p>,
                    time: "12 seconds ago",
                  },
                  {
                    icon: (
                      <div className="bg-red-50 p-1.5 rounded-full">
                        <svg className="w-3.5 h-3.5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </div>
                    ),
                    text: <p className="text-xs text-slate-500"><strong className="text-slate-700">Marcus J.</strong> missed Question 5.</p>,
                    time: "45 seconds ago",
                  },
                  {
                    icon: (
                      <div className="bg-emerald-50 p-1.5 rounded-full">
                        <svg className="w-3.5 h-3.5 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    ),
                    text: <p className="text-xs text-slate-500"><strong className="text-slate-700">Sarah L.</strong> got Question 3 right!</p>,
                    time: "1 min ago",
                  },
                ].map((feed, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    {feed.icon}
                    <div className="min-w-0 flex-1">
                      {feed.text}
                      <span className="text-[10px] font-bold text-slate-400 block mt-0.5">{feed.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

        {/* BOTTOM CONTAINER: LIVE RANKINGS */}
        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
          
          {/* Section Header */}
          <div className="p-5 border-b border-slate-50 bg-[#FBFBFF] flex items-center gap-2">
            <svg className="w-5 h-5 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 002 2h2a2 2 0 002-2z" />
            </svg>
            <h2 className="text-sm font-extrabold text-slate-800">
              Live Rankings
            </h2>
          </div>

          {/* Table Element */}
          <div className="overflow-x-auto w-full">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-100 text-[10px] font-black text-slate-400 uppercase tracking-widest bg-slate-50/50">
                  <th className="py-4 px-6 w-24">Rank</th>
                  <th className="py-4 px-6">Player</th>
                  <th className="py-4 px-6 text-right w-36">Score</th>
                  <th className="py-4 px-6 text-right w-40">Progress</th>
                </tr>
              </thead>
              <tbody>
                {liveRankings.map((user, idx) => (
                  <tr 
                    key={idx} 
                    className={`border-b border-slate-50 text-xs font-bold transition-colors ${
                      user.isUser ? "bg-indigo-50/40 hover:bg-indigo-50" : "hover:bg-slate-50"
                    }`}
                  >
                    {/* Rank */}
                    <td className="py-4 px-6">
                      <span className={user.color}>
                        {user.rank}
                      </span>
                    </td>

                    {/* Profile avatar / Name */}
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className={`h-7 w-7 rounded-full text-[10px] font-black flex items-center justify-center tracking-wider border shadow-sm ${
                          user.isUser 
                            ? "bg-indigo-600 border-indigo-600 text-white" 
                            : "bg-slate-100 text-slate-600 border-slate-200"
                        }`}>
                          {user.initials}
                        </div>
                        <span className={user.isUser ? "text-[#1D10C5] font-black" : "text-slate-700"}>
                          {user.name}
                        </span>
                      </div>
                    </td>

                    {/* Score */}
                    <td className="py-4 px-6 text-right">
                      <span className={user.isUser ? "text-[#1D10C5] font-black" : "text-slate-600"}>
                        {user.score}
                      </span>
                    </td>

                    {/* Progress indicator */}
                    <td className="py-4 px-6 text-right">
                      <span className={user.isUser ? "text-[#1D10C5] font-black" : "text-slate-500"}>
                        {user.progress}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>

      </main>

      <Footer />
    </div>
  );
}