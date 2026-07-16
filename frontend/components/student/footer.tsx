import React from 'react';

export default function Footer() {
  const links = [
    { name: 'Privacy Policy', href: '#privacy' },
    { name: 'Terms of Service', href: '#terms' },
    { name: 'API Documentation', href: '#api' },
    { name: 'Contact Us', href: '#contact' },
  ];

  return (
    <footer className="w-full bg-[#EBF0FD] border-t border-slate-100 py-6 px-4 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 font-sans">
      
      {/* LEFT: Logo branding and copyright info */}
      <div className="text-center sm:text-left">
        <h3 className="text-base font-extrabold text-slate-800 tracking-tight">
          QuizArena
        </h3>
        <p className="text-xs font-semibold text-slate-500 mt-1">
          © 2024 QuizArena. Powered by RAG-AI.
        </p>
      </div>

      {/* RIGHT: Navigation lists */}
      <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
        {links.map((link) => (
          <a
            key={link.name}
            href={link.href}
            className="text-xs font-semibold text-slate-500 hover:text-[#483CD8] transition-colors"
          >
            {link.name}
          </a>
        ))}
      </nav>

    </footer>
  );
}