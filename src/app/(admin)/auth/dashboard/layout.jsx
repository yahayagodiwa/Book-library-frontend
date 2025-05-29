"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X } from "lucide-react";
import clsx from "clsx";
import { MdSpaceDashboard } from "react-icons/md";
import { FaUser, FaBell } from "react-icons/fa";
import { FaBookOpenReader } from "react-icons/fa6";
import { IoSettings } from "react-icons/io5";

const navLinks = [
  { label: "Dashboard", href: "/auth/dashboard", icon: <MdSpaceDashboard size={20} /> },
  { label: "Profile", href: "/auth/dashboard/profile", icon: <FaUser size={20} /> },
  { label: "Books", href: "/auth/dashboard/books", icon: <FaBookOpenReader size={20} /> },
  { label: "Users", href: "/auth/dashboard/users", icon: <span className="text-xl">💰</span> },
  { label: "Settings", href: "/auth/dashboard/settings", icon: <IoSettings size={20} /> },
];

const SidebarLayout = ({ children }) => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const logout = () => {
    localStorage.removeItem("token");
    router.push("/auth/login");
  };

  return (
    <div className="h-screen overflow-hidden ">
      {/* Topbar (Desktop) */}
      <header className="hidden md:flex items-center justify-between px-6 py-4 bg-[#1E2A38] text-white shadow-md sticky top-0 z-50">
        <h2 className="text-2xl font-bold tracking-wide">📚 Book Lab</h2>
        <div className="flex items-center gap-4">
          <FaBell className="hover:text-blue-400 cursor-pointer" />
        </div>
      </header>

      <div className="flex h-full">
        {/* Sidebar */}
        <aside
          className={clsx(
            "fixed top-0 left-0 h-full w-64  shadow-2xl z-40 p-6 space-y-4 transform transition-transform duration-300",
            "md:translate-x-0 md:static md:block",
            isOpen ? "translate-x-0" : "-translate-x-full"
          )}
        >
          <div className="flex items-center justify-between md:hidden mb-4">
            <h2 className="text-xl font-bold text-[#1E2A38]">📚 Book Lab</h2>
            <button onClick={() => setIsOpen(false)} className="text-[#1E2A38]">
              <X />
            </button>
          </div>

          <nav className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={clsx(
                  "flex items-center gap-3 px-4 py-2 rounded-md transition-colors",
                  pathname === link.href
                    ? "bg-blue-600 text-white font-semibold"
                    : "text-[#1E2A38] hover:bg-blue-100"
                )}
                onClick={() => setIsOpen(false)}
              >
                {link.icon}
                <span>{link.label}</span>
              </Link>
            ))}
          </nav>
          <button
            onClick={logout}
            className="flex items-center cursor-pointer gap-3 px-4 py-2 rounded-md text-red-600 hover:bg-red-100 transition"
          >
            <span>Logout</span>
          </button>
        </aside>

        {/* Mobile overlay */}
        {isOpen && (
          <div
            className="fixed inset-0 bg-black opacity-40 z-30 md:hidden"
            onClick={() => setIsOpen(false)}
          />
        )}

        {/* Main content */}
        <div className="flex-1 h-full bg-gray-50 overflow-y-auto overscroll-none">
          {/* Topbar (Mobile) */}
          <header className="md:hidden flex items-center justify-between px-6 py-4 bg-[#F3F4F6] shadow-md sticky top-0 z-40">
            <button onClick={() => setIsOpen(true)} className="text-gray-700">
              <Menu />
            </button>
            <h2 className="text-xl font-semibold text-[#1E2A38]">Dashboard</h2>
          </header>
{/* <div class="bg-gradient-to-r from-gray-100 via-blue-50 to-white"></div> */}

          {/* Main Children */}
          <main className="md:p-6 bg-[#F3F4F6]">{children}</main>
        </div>
      </div>
    </div>
  );
};

export default SidebarLayout;