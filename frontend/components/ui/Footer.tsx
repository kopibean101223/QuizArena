import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-[#EAE8F2] px-8 py-6 w-full flex flex-col md:flex-row items-center justify-between text-gray-700 text-sm">
      {/* Left Section: Brand & Copyright */}
      <div className="flex flex-col gap-1 mb-4 md:mb-0">
        <span className="font-bold text-gray-900 text-base">QuizArena</span>
        <span className="text-gray-600">
          © 2024 QuizArena. Powered by RAG-AI.
        </span>
      </div>

      {/* Right Section: Links */}
      <nav className="flex items-center gap-6 font-medium text-gray-500">
        <Link href="/privacy" className="hover:text-gray-800 transition-colors">
          Privacy Policy
        </Link>
        <Link href="/terms" className="hover:text-gray-800 transition-colors">
          Terms of Service
        </Link>
        <Link href="/docs" className="hover:text-gray-800 transition-colors">
          API Documentation
        </Link>
        <Link href="/contact" className="hover:text-gray-800 transition-colors">
          Contact Us
        </Link>
      </nav>
    </footer>
  );
}