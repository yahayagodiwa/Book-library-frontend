"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react"; // for hamburger icon
import clsx from "clsx";
import { MdSpaceDashboard } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { FaBookOpenReader } from "react-icons/fa6";
import { IoSettings } from "react-icons/io5";
import { FaBell } from "react-icons/fa";


const navLinks = [
  { label: "Dashboard", href: "/dashboard", icon: <MdSpaceDashboard size={30}/> },
  { label: "Profile", href: "/dashboard/profile", icon: <FaUser size={30}/> },
  { label: "My Books", href: "/dashboard/books", icon: <FaBookOpenReader size={30}/> },
  { label: "Fines", href: "/dashboard/fines", icon: "💰" },
  { label: "Settings", href: "/dashboard/settings", icon: <IoSettings size={30}/> },
  { label: "Logout", href: "/", icon: "🚪" },
];

const SidebarLayout = ({ children }) => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (

    <>
    {/* Top Navigation Bar (Desktop Only) */}
<header className="hidden md:flex items-center justify-between px-6 py-4 bg-[#1E2A38] text-white shadow-md sticky top-0 z-50">
  <h2 className="text-2xl font-bold tracking-wide">📚 Book Lab</h2>

  <div className="flex items-center gap-4">
    <FaBell className="hover:text-blue-400 cursor-pointer" />
    {/* <span className="text-sm font-medium">{user?.username}</span> */}
  </div>
</header>

   
    <div className="flex">
        
      {/* Sidebar */}
      <aside
        className={clsx(
          " fixed h-screen overflow-y-auto shadow-2xl text-[#1E2A38] p-6 space-y-2 w-64 z-40 transition-transform duration-300",
          "md:static md:translate-x-0 md:block",
          isOpen ? "translate-x-0 fixed top-0 left-0" : "-translate-x-full fixed top-0 left-0"
        )}
      >
        <div className="flex items-center justify-between md:justify-start md:space-x-2">
        
          <button
            className="md:hidden text-white"
            onClick={() => setIsOpen(false)}
          >
            <X />
          </button>
        </div>

        <nav className="flex flex-col space-y-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={clsx(
                "flex items-center text-[#1E2A38] space-x-2 px-4 py-2 rounded-md hover:bg-blue-600 transition",
                pathname === link.href && "bg-blue-500 font-semibold text-white"
              )}
              onClick={() => setIsOpen(false)} // close on click (mobile)
            >
              <span>{link.icon}</span>
              <span>{link.label}</span>
            </Link>
          ))}
        </nav>
      </aside>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-[#F3F4F6] md:hidden z-30"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="flex-1 md:ml-10">
        {/* Topbar */}
        <header className="flex items-center justify-between px-6 py-4 bg-white shadow-md md:hidden">
          <button onClick={() => setIsOpen(true)} className="text-gray-700">
            <Menu />
          </button>
          <h2 className="text-xl font-semibold text-[#1E2A38]">Dashboard</h2>
        </header>

       <main className="p-8 min-h-screen">
{children}</main>
      </div>
    </div>
     </>
  );
};

export default SidebarLayout;
