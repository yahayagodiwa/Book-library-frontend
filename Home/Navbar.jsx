"use client";
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import useAuthStore from '../store';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const {user, getUser} = useAuthStore()
  useEffect(()=>{
    getUser()
  },[])

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <header className="bg-[#1E2A38] text-[#F3F4F6] shadow-md fixed w-[100vw] z-40">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <h1 className="text-2xl font-bold text-[#FBBF24]">P-Lab</h1>

        {/* Desktop Links */}
        <nav className="hidden md:flex space-x-6 text-[#F3F4F6]">
          <Link href="/" className="hover:text-[#60A5FA] transition">Home</Link>
          <Link href="/about-us" className="hover:text-[#60A5FA] transition">About</Link>
          <Link href="/books" className="hover:text-[#60A5FA] transition">Books</Link>
          <Link href="#" className="hover:text-[#60A5FA] transition">Contact</Link>
           {user ? <Link href='/dashboard' className='bg-[#60A5FA] px-3 py-1 rounded-2xl hover:text-[#1E2A38] transition'>Dashboard</Link> : <div className='flex gap-4 items-center'>
          <Link href="/login" className="bg-[#FBBF24] px-3 py-1 rounded-2xl hover:text-[#1E2A38] transition">Login</Link>
          <Link href="register" className="bg-[#60A5FA] px-3 py-1 rounded-2xl hover:text-[#1E2A38] transition">Sign Up</Link>
          </div>}
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
        <div className="md:hidden  bg-[#1E2A38] px-4 pb-4">
          <nav className="flex flex-col text-center space-y-3 text-[#F3F4F6]">
            <Link href="/" className="hover:text-[#60A5FA] transition">Home</Link>
            <Link href="/about-us" className="hover:text-[#60A5FA] transition">About</Link>
            <Link href="/books" className="hover:text-[#60A5FA] transition">Books</Link>
            <Link href="#" className="hover:text-[#60A5FA] transition">Contact</Link>
             {user ? <Link href='/dashboard' className='bg-[#60A5FA] px-3 py-1 rounded-2xl hover:text-[#1E2A38] transition'>Dashboard</Link> : <div className='flex flex-col gap-4 items-center'>
          <Link href="/login" className="bg-[#FBBF24] px-3 py-1 rounded-2xl hover:text-[#1E2A38] transition">Login</Link>
          <Link href="register" className="bg-[#60A5FA] px-3 py-1 rounded-2xl hover:text-[#1E2A38] transition">Sign Up</Link>
          </div>}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
