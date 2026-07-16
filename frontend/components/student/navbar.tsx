"use client";

import React, { useState } from 'react';

export default function Navbar() {
  const [activeTab, setActiveTab] = useState('Dashboard');

  const navItems = ['Dashboard', 'Battle', 'Analytics'];

  return (
    <header className="w-full bg-white border-b border-slate-100 px-4 sm:px-8 py-3 flex items-center justify-between font-sans">
      
      {/* LEFT: Logo & Navigation */}
      <div className="flex items-center gap-8">
        {/* Logo */}
        <a href="#home" className="flex items-center gap-2 group">
          {/* Custom SVGArena Colosseum Logo */}
          <div className="relative w-8 h-8 flex-shrink-0">
            <svg viewBox="0 0 100 100" className="w-full h-full text-[#483CD8] group-hover:scale-105 transition-transform" fill="currentColor">
              <path d="M50 5C25.1 5 5 25.1 5 50s20.1 45 45 45 45-20.1 45-45S74.9 5 50 5zm0 80c-19.3 0-35-15.7-35-35 0-14.1 8.3-26.2 20.4-31.7 1-.4 2 .2 2.3 1.2s-.2 2-1.2 2.3C26 21.3 19 31.7 19 50c0 17.1 13.9 31 31 31s31-13.9 31-31c0-10.4-5.1-19.6-13-25.3.8-.2 1.6-.5 2.3-.9 9.1 6.6 14.7 17.3 14.7 29.2 0 19.3-15.7 35-35 35z" />
              <path d="M38 45h24v6H38zM34 57h32v6H34zM44 33h12v6H44z" />
            </svg>
          </div>
          <span className="text-xl font-black text-indigo-950 tracking-tight">
            QuizArena
          </span>
        </a>

        {/* Navigation Tabs */}
        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item) => {
            const isActive = activeTab === item;
            return (
              <button
                key={item}
                onClick={() => setActiveTab(item)}
                className={`relative py-2 px-3 text-sm font-bold tracking-wide transition-colors ${
                  isActive ? 'text-[#483CD8]' : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                {item}
                {isActive && (
                  <span className="absolute bottom-[-13px] left-0 right-0 h-[3px] bg-[#483CD8] rounded-full" />
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* RIGHT: Search, Notifications, Settings, Avatar */}
      <div className="flex items-center gap-4 sm:gap-6">
        
        {/* Search Bar */}
        <div className="relative hidden sm:block w-64 lg:w-80">
          <span className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-slate-400">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </span>
          <input
            type="text"
            placeholder="Find quizzes..."
            className="w-full bg-[#F3F4FE] border border-transparent hover:border-slate-200 focus:border-indigo-300 focus:ring-4 focus:ring-indigo-100 rounded-full py-2 pl-9 pr-4 text-xs font-semibold text-slate-700 placeholder-slate-400 outline-none transition-all"
          />
        </div>

        {/* Notification Bell */}
        <button className="p-1.5 rounded-full hover:bg-slate-50 text-slate-600 hover:text-[#483CD8] transition-colors relative">
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
          {/* Notification dot indicator */}
          <span className="absolute top-1.5 right-1.5 h-2.5 w-2.5 bg-red-500 rounded-full border-2 border-white" />
        </button>

        {/* Settings Gear */}
        <button className="p-1.5 rounded-full hover:bg-slate-50 text-slate-600 hover:text-[#483CD8] transition-colors">
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </button>

        {/* User Avatar */}
        <div className="relative h-9 w-9 rounded-full overflow-hidden border border-slate-100 shadow-sm cursor-pointer hover:opacity-90 transition-opacity">
          <img
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            alt="User Profile"
            className="h-full w-full object-cover"
          />
        </div>

      </div>
    </header>
  );
}