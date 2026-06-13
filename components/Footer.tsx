import Image from "next/image";
import Link from "next/link";
import { Phone, Mail, MapPin, ExternalLink } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-uch-green text-white">
      <div className="h-1 bg-uch-gold w-full" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Branding */}
          <div>
            <Image
              src="/logo.jpg"
              alt="UCH Procurement"
              width={200}
              height={200}
              className="h-14 w-auto mb-4"
            />
            <p className="text-sm text-white/75 leading-relaxed">
              The official Procurement portal of University College Hospital
              (UCH), Ibadan — Nigeria&apos;s foremost Federal Teaching Hospital,
              established 1957.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-uch-gold font-semibold text-sm uppercase tracking-widest mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2 text-sm text-white/80">
              {[
                { label: "Tender Notices", href: "/notices?type=tender" },
                { label: "Contract Awards", href: "/notices?type=award" },
                { label: "General Notices", href: "/notices?type=notice" },
                { label: "Procurement Policy", href: "/about#policy" },
                { label: "UCH Main Website", href: "https://uch-ibadan.org.ng", external: true },
              ].map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    target={l.external ? "_blank" : undefined}
                    rel={l.external ? "noopener noreferrer" : undefined}
                    className="flex items-center gap-1.5 hover:text-uch-gold transition-colors"
                  >
                    {l.label}
                    {l.external && <ExternalLink size={11} />}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-uch-gold font-semibold text-sm uppercase tracking-widest mb-4">
              Contact
            </h3>
            <ul className="space-y-3 text-sm text-white/80">
              <li className="flex items-start gap-2.5">
                <MapPin size={16} className="mt-0.5 text-uch-gold shrink-0" />
                <span>Procurement Department, UCH, Queen Elizabeth Road, Ibadan, Oyo State, Nigeria</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone size={16} className="text-uch-gold shrink-0" />
                <span>+234 (0) 2 241 0088</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail size={16} className="text-uch-gold shrink-0" />
                <span>procurement@uch-ibadan.org.ng</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-white/15 flex flex-col sm:flex-row justify-between
                        items-center gap-3 text-xs text-white/50">
          <p>
            &copy; {new Date().getFullYear()} University College Hospital, Ibadan. All rights reserved.
          </p>
          <p className="uppercase tracking-widest">
            Federal Republic of Nigeria
          </p>
        </div>
      </div>
    </footer>
  );
}
