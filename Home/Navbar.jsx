"use client";
import Link from 'next/link';
import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <header className="bg-[#1E2A38] text-[#F3F4F6] shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <h1 className="text-2xl font-bold text-[#FBBF24]">P-Lab</h1>

        {/* Desktop Links */}
        <nav className="hidden md:flex space-x-6 text-[#F3F4F6]">
          <Link href="/" className="hover:text-[#60A5FA] transition">Home</Link>
          <Link href="/about" className="hover:text-[#60A5FA] transition">About</Link>
          <Link href="/books" className="hover:text-[#60A5FA] transition">Books</Link>
          <Link href="/contact" className="hover:text-[#60A5FA] transition">Contact</Link>
        </nav>

        {/* Mobile menu button */}
        <button
          className="md:hidden text-[#F3F4F6]"
          onClick={toggleMenu}
          aria-label="Toggle Menu"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-[#1E2A38] px-4 pb-4">
          <nav className="flex flex-col space-y-3 text-[#F3F4F6]">
            <Link href="/" className="hover:text-[#60A5FA] transition">Home</Link>
            <Link href="/about" className="hover:text-[#60A5FA] transition">About</Link>
            <Link href="/books" className="hover:text-[#60A5FA] transition">Books</Link>
            <Link href="/contact" className="hover:text-[#60A5FA] transition">Contact</Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
