import Link from "next/link";
import { Facebook, Twitter, Instagram } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-[#1E2A38] text-white py-12 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1  md:grid-cols-4 gap-8 justify-items-center">
        {/* Brand */}
        <div>
          <h3 className="text-xl text-center md:text-left font-bold mb-2">P-Lab</h3>
          <p className="text-sm text-[#D1D5DB] text-center md:text-left">
            Your digital library for discovering, borrowing, and reading books.
          </p>
        </div>

        {/* Navigation */}
        <div>
          <h4 className="font-semibold mb-3 text-[#FBBF24]">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/" className="hover:text-[#FBBF24]">Home</Link></li>
            <li><Link href="/catalog" className="hover:text-[#FBBF24]">Catalog</Link></li>
            <li><Link href="/faq" className="hover:text-[#FBBF24]">FAQ</Link></li>
            <li><Link href="/contact" className="hover:text-[#FBBF24]">Contact</Link></li>
          </ul>
        </div>

        {/* Policy */}
        <div>
          <h4 className="font-semibold mb-3 text-[#FBBF24]">Policies</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/terms" className="hover:text-[#FBBF24]">Terms of Service</Link></li>
            <li><Link href="/privacy" className="hover:text-[#FBBF24]">Privacy Policy</Link></li>
            <li><Link href="/return-policy" className="hover:text-[#FBBF24]">Return Policy</Link></li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h4 className="font-semibold mb-3 text-[#FBBF24]">Follow Us</h4>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-[#FBBF24]"><Facebook /></a>
            <a href="#" className="hover:text-[#FBBF24]"><Twitter /></a>
            <a href="#" className="hover:text-[#FBBF24]"><Instagram /></a>
          </div>
        </div>
      </div>

      <div className="text-center text-sm text-[#9CA3AF] mt-10">
        &copy; {new Date().getFullYear()} P-Lab. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
