"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Bell, Settings } from 'lucide-react';
import { Button } from './Button'; 
import { useRouter } from 'next/navigation';
import { createBrowserSupabaseClient } from '@/lib/supabase/client'; 

export default function Header() {
  const [avatarUrl, setAvatarUrl] = useState<string>("/avatar-placeholder.jpg");
  const [userName, setUserName] = useState<string>("Teacher");
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

  return (
    <header className="flex items-center justify-between px-6 py-3 bg-white border-b border-gray-200">
      
   
      <div className="flex items-center gap-8">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center overflow-hidden">
             {/* Swapped to your custom fw-bold and fs-xs classes */}
             <span className="text-white fw-bold fs-xs">QA</span>
          </div>
          {/* Swapped to your custom fw-bold class */}
          <span className="text-xl fw-bold text-indigo-800">QuizArena</span>
        </Link>
        
        <nav>
          <Link 
            href="/teacher-home" 
          
            className="text-indigo-700 fw-semibold fs-sm pb-4 border-b-2 border-indigo-700 hover:text-indigo-800 transition-colors"
          >
            Dashboard
          </Link>
        </nav>
      </div>


      <div className="flex items-center gap-6">
        

        <Button 
          onClick={() => router.push('/teacher-dashboard/create-quiz')}
          className="bg-indigo-600 hover:bg-indigo-700 text-white border border-dashed border-indigo-400 fw-semibold fs-sm"
        >
          Create Quiz
        </Button>
        
        <div className="flex items-center gap-4 text-gray-600">
          <button aria-label="Notifications" className="hover:text-gray-900 transition-colors">
            <Bell size={20} />
          </button>
          <button aria-label="Settings" className="hover:text-gray-900 transition-colors">
            <Settings size={20} />
          </button>
        </div>

        <button 
          title={userName}
          className="w-8 h-8 rounded-full overflow-hidden border border-gray-300 transition-transform hover:scale-105"
        >
          <Image 
            src={avatarUrl} 
            alt={`${userName}'s Avatar`} 
            width={32} 
            height={32} 
            className="object-cover w-full h-full"
          />
        </button>
      </div>
    </header>
  );
}
















