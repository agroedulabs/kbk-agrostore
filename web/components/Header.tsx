"use client";
import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [open, setOpen] = useState(false);

  const navLinks = [
    { href: "/", label: "Beranda" },
    { href: "/produk", label: "Produk" },
    { href: "/tentang", label: "Tentang KBK" },
    { href: "/admin", label: "Admin" },
  ];

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 bg-hijau-600 rounded-xl flex items-center justify-center text-white font-bold text-lg group-hover:bg-hijau-700 transition-colors">
              K
            </div>
            <div>
              <div className="font-bold text-gray-900 leading-tight text-sm">KBK AgroStore</div>
              <div className="text-xs text-gray-500 leading-tight">Cepiring, Kendal</div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.slice(0, -1).map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="px-3 py-2 text-sm font-medium text-gray-600 hover:text-hijau-700 hover:bg-hijau-50 rounded-lg transition-colors"
              >
                {l.label}
              </Link>
            ))}
            <Link
              href="https://shopee.co.id"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-2 btn-primary text-sm"
            >
              🛒 Beli di Shopee
            </Link>
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100"
          >
            {open ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Nav */}
        {open && (
          <div className="md:hidden pb-4 pt-2 border-t border-gray-100">
            {navLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="block px-3 py-2 text-sm font-medium text-gray-700 hover:text-hijau-700 hover:bg-hijau-50 rounded-lg"
              >
                {l.label}
              </Link>
            ))}
            <Link
              href="https://shopee.co.id"
              target="_blank"
              onClick={() => setOpen(false)}
              className="mt-2 block text-center btn-primary text-sm"
            >
              🛒 Beli di Shopee
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
