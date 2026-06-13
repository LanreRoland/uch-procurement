"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";

const navLinks = [
  { label: "Home", href: "/" },
  {
    label: "Procurement",
    href: "#",
    children: [
      { label: "Tender Notices", href: "/notices?type=tender" },
      { label: "Contract Awards", href: "/notices?type=award" },
      { label: "General Notices", href: "/notices?type=notice" },
      { label: "Adverts", href: "/notices?type=advert" },
    ],
  },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [dropOpen, setDropOpen] = useState(false);

  return (
    <header className="bg-uch-green shadow-md sticky top-0 z-50">
      {/* Top accent bar */}
      <div className="h-1 bg-uch-gold w-full" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 shrink-0">
            <Image
              src="/logo.jpg"
              alt="UCH Procurement"
              width={200}
              height={200}
              priority
              className="h-14 w-auto"
            />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1 flex-1">
            {navLinks.map((link) =>
              link.children ? (
                <div key={link.label} className="relative group">
                  <button
                    className="flex items-center gap-1 px-4 py-2 text-white text-sm font-medium
                               hover:text-uch-gold transition-colors"
                    onMouseEnter={() => setDropOpen(true)}
                    onMouseLeave={() => setDropOpen(false)}
                  >
                    {link.label}
                    <ChevronDown size={14} />
                  </button>
                  <div
                    className={`absolute top-full left-0 bg-white shadow-xl rounded-md py-2 min-w-48
                               border border-gray-100 transition-all duration-150 ${
                                 dropOpen ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-1"
                               }`}
                    onMouseEnter={() => setDropOpen(true)}
                    onMouseLeave={() => setDropOpen(false)}
                  >
                    {link.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-uch-green-light
                                   hover:text-uch-green transition-colors"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-4 py-2 text-white text-sm font-medium hover:text-uch-gold transition-colors"
                >
                  {link.label}
                </Link>
              )
            )}
          </nav>

          {/* Admin Login Button */}
          <Link
            href="/admin/login"
            className="hidden md:inline-block px-4 py-2 bg-white text-uch-green font-semibold rounded-md
                       hover:bg-gray-100 transition-colors text-sm"
          >
            Admin Login
          </Link>

          {/* Mobile toggle */}
          <button
            className="md:hidden text-white p-2"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-uch-green-dark border-t border-white/10">
          <div className="px-4 py-3 space-y-1">
            {navLinks.map((link) =>
              link.children ? (
                <div key={link.label}>
                  <p className="text-uch-gold text-xs uppercase tracking-widest px-2 pt-2 pb-1 font-semibold">
                    {link.label}
                  </p>
                  {link.children.map((child) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      onClick={() => setOpen(false)}
                      className="block px-4 py-2 text-sm text-white hover:text-uch-gold"
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block px-2 py-2.5 text-sm text-white hover:text-uch-gold"
                >
                  {link.label}
                </Link>
              )
            )}
            <div className="border-t border-white/10 my-2 pt-2">
              <Link
                href="/admin/login"
                onClick={() => setOpen(false)}
                className="block px-4 py-3 bg-white text-uch-green font-semibold rounded-md
                           hover:bg-gray-100 transition-colors text-sm text-center"
              >
                Admin Login
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
