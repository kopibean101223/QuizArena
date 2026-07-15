import React, { ReactNode } from 'react';

interface AuthLayoutProps {
  children: ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps): React.JSX.Element {
  return (
    <div className="relative min-h-screen w-full flex items-center justify-center bg-[#EBF0FD] p-4 sm:p-8 overflow-hidden font-sans">
      
      {/* BACKGROUND GRAPHICS (Only visible on medium screens and up) */}
      <div className="absolute inset-0 z-0 hidden md:block pointer-events-none">
        <div className="bg-decor-left w-1/3 h-full absolute top-0 left-0" />
        <div className="bg-decor-right w-2/5 h-full absolute top-0 right-0" />
      </div>

      {/* DYNAMIC CONTENT CONTAINER (Where your form card gets injected) */}
      <div className="relative z-10 w-full max-w-lg">
        {children}
      </div>

    </div>
  );
}