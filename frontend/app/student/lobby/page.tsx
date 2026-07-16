"use client";

import React, { useState, useEffect } from "react";
import {
  Clock,
  Flame,
  BarChart3,
  Wifi,
  CheckCircle,
  Lock,
} from "lucide-react";
import Navbar from "@/components/student/navbar";
import Footer from "@/components/student/footer";
import LobbyParticipant from "@/components/student/lobby/participants";

export default function BattleLobbyPage() {
  const [timeLeft, setTimeLeft] = useState(44);

  // Quick timer countdown simulation
  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  // Calculate SVG circular progress dash-offset
  const radius = 50;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (timeLeft / 44) * circumference;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-800">
      <Navbar />

      {/* ==================== MAIN CONTENT ==================== */}
      <main className="flex-grow max-w-7xl w-full mx-auto p-6 md:p-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* LEFT COLUMN: Quiz info & details */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          
          {/* Main Quiz Header Card */}
          <div className="bg-white border border-slate-100 rounded-2xl p-8 flex flex-col items-center justify-center text-center shadow-sm relative overflow-hidden min-h-[360px]">
            <span className="text-[10px] uppercase tracking-widest font-extrabold bg-indigo-50 text-indigo-600 px-3 py-1 rounded-full mb-4">
              Speed Mode
            </span>
            <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight mb-2">
              Discrete Mathematics – Quiz 3
            </h1>
            <p className="text-slate-500 text-sm font-medium mb-8">
              Prof. Sarah Jenkins • Chapter 4 & 5 Review
            </p>

            {/* Countdown Circular Timer */}
            <div className="relative w-32 h-32 flex items-center justify-center">
              <svg className="absolute w-full h-full transform -rotate-90">
                <circle
                  cx="64"
                  cy="64"
                  r={radius}
                  className="stroke-slate-100"
                  strokeWidth="6"
                  fill="transparent"
                />
                <circle
                  cx="64"
                  cy="64"
                  r={radius}
                  className="stroke-indigo-600 transition-all duration-1000 ease-linear"
                  strokeWidth="6"
                  fill="transparent"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                />
              </svg>
              <div className="flex flex-col items-center justify-center">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Starting in</span>
                <span className="text-4xl font-black text-slate-800 leading-tight">{timeLeft}</span>
                <span className="text-[10px] font-bold text-slate-400 uppercase">Seconds</span>
              </div>
            </div>
          </div>

          {/* Quick Rules Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Time limit */}
            <div className="bg-white border border-slate-100 rounded-2xl p-6 flex gap-4 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                <Clock size={20} />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-sm mb-1">Time per Question</h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  You have 25 seconds to answer each question. Unanswered questions are marked incorrect.
                </p>
              </div>
            </div>

            {/* Streak bonuses */}
            <div className="bg-white border border-slate-100 rounded-2xl p-6 flex gap-4 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                <Flame size={20} />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-sm mb-1">Streak Bonuses</h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  3 consecutive correct answers trigger a 2× point multiplier for the next question.
                </p>
              </div>
            </div>
          </div>

          {/* Scoring details */}
          <div className="bg-white border border-slate-100 rounded-2xl p-6 flex gap-4 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
              <BarChart3 size={20} />
            </div>
            <div>
              <h4 className="font-bold text-slate-900 text-sm mb-1">Scoring Logic</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Speed matters. The faster you answer correctly, the more base points you earn. Incorrect answers do not penalize beyond losing the streak.
              </p>
            </div>
          </div>

          {/* Connection status */}
          <div className="bg-indigo-50/40 border border-indigo-100/50 rounded-2xl px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-500 flex items-center justify-center">
                <Wifi size={18} />
              </div>
              <div>
                <h5 className="font-bold text-slate-800 text-xs">Connection Stable</h5>
                <p className="text-[10px] text-slate-400 font-semibold">Ping: 24ms</p>
              </div>
            </div>
            <CheckCircle size={18} className="text-emerald-500" />
          </div>

        </div>

        {/* RIGHT COLUMN: Lobby details & interactive cards */}
        <div className="flex flex-col gap-4">
          
          {/* Lobby Card */}
          <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm flex-grow flex flex-col">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-black text-xl text-slate-900">Lobby</h3>
              <span className="text-[10px] font-extrabold bg-indigo-600 text-white px-2.5 py-1 rounded-full">
                24/48 Ready
              </span>
            </div>

            {/* Refactored Participants Grid */}
            <div className="grid grid-cols-4 gap-4 mb-6">
              <LobbyParticipant type="self" />
              
              <LobbyParticipant 
                type="image" 
                avatarUrl="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100&h=100" 
              />
              
              <LobbyParticipant 
                type="image" 
                avatarUrl="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100&h=100" 
              />
              
              <LobbyParticipant 
                type="image" 
                avatarUrl="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=100&h=100" 
              />
              
              <LobbyParticipant type="initials" name="JD" />
              
              <LobbyParticipant 
                type="image" 
                avatarUrl="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=100&h=100" 
              />
              
              <LobbyParticipant type="initials" name="AL" />
              
              <LobbyParticipant type="initials" name="MR" />
              
              <LobbyParticipant type="empty" />
              <LobbyParticipant type="empty" />
              <LobbyParticipant type="empty" />
            </div>

            {/* Lobby subtext status */}
            <p className="text-center text-xs font-semibold text-slate-400 mt-auto pt-6 border-t border-slate-100">
              Waiting for remaining 24 students...
            </p>
          </div>

          {/* Action Trigger Card */}
          <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm flex flex-col items-center justify-center text-center">
            <button
              disabled
              className="w-full py-4 rounded-xl font-bold text-sm bg-indigo-100/60 text-indigo-400/80 cursor-not-allowed flex items-center justify-center gap-2 mb-3"
            >
              <Lock size={16} />
              Start Quiz
            </button>
            <p className="text-[10px] font-bold text-slate-400 leading-normal max-w-[240px]">
              Button will unlock when timer reaches zero or host starts.
            </p>
          </div>

        </div>
      </main>
      
      <Footer />
    </div>
  );
}