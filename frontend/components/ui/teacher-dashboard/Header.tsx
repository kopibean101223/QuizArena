"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { Bell, Settings, Search } from 'lucide-react';
import { Button } from '../Button'; 
import { createBrowserSupabaseClient } from '@/lib/supabase/client'; 

export default function Header() {
  const [avatarUrl, setAvatarUrl] = useState<string>("/avatar-placeholder.jpg");
  const [userName, setUserName] = useState<string>("Teacher");
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const fetchUserProfile = async () => {
      const supabase = createBrowserSupabaseClient();
      const { data: { user }, error } = await supabase.auth.getUser();

      if (user && !error) {
        const metadata = user.user_metadata;
        if (metadata?.avatar_url) {
          setAvatarUrl(metadata.avatar_url);
        }
        if (metadata?.full_name) {
          setUserName(metadata.full_name);
        }
      }
    };

    fetchUserProfile();
  }, []);





  const navLinks = [
    { name: 'Dashboard', href: '/teacher-dashboard',active: pathname === '/teacher-dashboard' },
    { name: 'Content Editor', href: '/teacher-dashboard/create-quiz',active: pathname.startsWith('/teacher-dashboard/create-quiz') || 
              pathname.startsWith('/teacher-dashboard/question-bank') },
    
  ];

  return (
    <header className="flex items-center justify-between px-6 py-3 bg-[#FCFAFF] border-b border-gray-100">
     
      <div className="flex items-center gap-10">
        <Link href="/" className="flex items-center gap-2">
          <div className="relative w-8 h-8 flex items-center justify-center">
            <Image 
              src="/icon-logo.svg" 
              alt="QuizArena Logo" 
              width={32} 
              height={32}
              className="object-contain"
              priority
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
          </div>
          <span className="text-lg fw-bold text-[#2A1B9F] tracking-wide">QuizArena</span>
        </Link>
        
        
        <nav className="flex items-center gap-6 h-full">
          {navLinks.map((link) => {
            const active = link.active
            return (
              <Link 
                key={link.name}
                href={link.href} 
                className={`text-sm fw-semibold transition-all pb-1.5 ${
                  active 
                    ? "text-[#3B25E6] border-b-2 border-[#3B25E6]" 
                    : "text-gray-500 hover:text-gray-800"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>
      </div>

      
      <div className="flex items-center gap-6">
        
    
        <div className="relative flex items-center">
          <Search className="absolute left-4 text-gray-400 w-4 h-4 pointer-events-none" />
          <input 
            type="text" 
            placeholder="Search" 
            className="w-64 pl-10 pr-4 py-2 text-sm bg-[#F3F0FA] text-gray-700 rounded-full border border-gray-200/50 outline-none focus:ring-1 focus:ring-indigo-400 focus:bg-white transition-all placeholder-gray-400"
          />
        </div>

        <Button 
          onClick={() => router.push('/teacher-dashboard/create-quiz')}
          className="bg-[#4338CA] hover:bg-[#2A1B9F] text-white fw-bold fs-xs px-6 py-2 rounded-3xl transition-all"
        >
          Create Quiz
        </Button>
        
       
        <div className="flex items-center gap-5 text-gray-600">
          <button aria-label="Notifications" className="hover:text-gray-900 transition-colors">
            <Bell size={20} className="stroke-[1.75]" />
          </button>
          <button aria-label="Settings" className="hover:text-gray-900 transition-colors">
            <Settings size={20} className="stroke-[1.75]" />
          </button>
        </div>

     
        <button 
          title={userName}
          className="w-9 h-9 rounded-full overflow-hidden border border-gray-200 transition-transform hover:scale-105"
        >
          <Image 
            src={avatarUrl} 
            alt={`${userName}'s Avatar`} 
            width={36} 
            height={36} 
            className="object-cover w-full h-full"
          />
        </button>
      </div>
    </header>
  );
}