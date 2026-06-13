import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import NoticeCard from "@/components/NoticeCard";
import Link from "next/link";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { ArrowRight, Shield, FileText, Award, Megaphone } from "lucide-react";

const highlights = [
  { icon: FileText,  label: "Tender Notices",   desc: "Open invitations for procurement bids.",      href: "/notices?type=tender",  color: "bg-blue-50 text-blue-700"    },
  { icon: Award,     label: "Contract Awards",  desc: "Published results of awarded contracts.",     href: "/notices?type=award",   color: "bg-yellow-50 text-yellow-700" },
  { icon: Shield,    label: "General Notices",  desc: "Official announcements and circulars.",       href: "/notices?type=notice",  color: "bg-green-50 text-uch-green"  },
  { icon: Megaphone, label: "Adverts",          desc: "Public adverts from the Procurement Dept.",  href: "/notices?type=advert",  color: "bg-purple-50 text-purple-700" },
];

export default async function HomePage() {
  let recentNotices: Array<{id: string; title: string; type: string; summary: string; created_at: string; deadline: string; ref_no: string}> = [];
  
  try {
    const supabase = await createSupabaseServerClient();
    const { data } = await supabase
      .from("notices")
      .select("id, title, type, summary, created_at, deadline, ref_no")
      .eq("published", true)
      .order("created_at", { ascending: false })
      .limit(6);
    
    if (data) {
      recentNotices = data;
    }
  } catch (error) {
    console.error("Error fetching notices:", error);
    // Continue rendering page with empty notices
  }

  return (
    <>
      <Navbar />

      {/* ── Hero ── */}
      <section className="relative bg-uch-green overflow-hidden">
        <div className="absolute inset-0 opacity-5"
             style={{ backgroundImage: "repeating-linear-gradient(45deg, #C9A227 0, #C9A227 1px, transparent 0, transparent 50%)", backgroundSize: "20px 20px" }} />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-white">
          <p className="text-uch-gold text-xs uppercase tracking-[0.25em] font-semibold mb-4">
            Federal Republic of Nigeria
          </p>
          <h1 className="font-display text-4xl sm:text-5xl font-bold leading-tight max-w-2xl mb-6">
            University College Hospital<br />
            <span className="text-uch-gold">Procurement Portal</span>
          </h1>
          <p className="text-white/80 text-lg max-w-xl leading-relaxed mb-8">
            Official platform for tenders, contract awards, and procurement notices
            in compliance with the Public Procurement Act 2007.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/notices" className="btn-gold">
              View All Notices <ArrowRight size={16} />
            </Link>
            <Link href="/about" className="btn-secondary border-white/40 text-white hover:bg-white/10 hover:text-white">
              About Procurement
            </Link>
            <Link href="/admin/login" className="btn-secondary border-white/40 text-white hover:bg-white/10 hover:text-white">
              Admin Login
            </Link>
          </div>
        </div>
      </section>

      {/* ── Category cards ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {highlights.map(({ icon: Icon, label, desc, href, color }) => (
            <Link key={href} href={href}
                  className="card p-5 flex flex-col gap-3 group hover:border-uch-green/30">
              <span className={`inline-flex items-center justify-center w-10 h-10 rounded-lg ${color}`}>
                <Icon size={20} />
              </span>
              <div>
                <p className="font-semibold text-gray-900 group-hover:text-uch-green transition-colors">
                  {label}
                </p>
                <p className="text-xs text-gray-500 mt-0.5">{desc}</p>
              </div>
              <ArrowRight size={14} className="text-gray-300 group-hover:text-uch-gold transition-colors mt-auto" />
            </Link>
          ))}
        </div>
      </section>

      {/* ── Recent notices ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="section-title">Recent Notices</h2>
            <p className="section-sub">Latest procurement activities</p>
          </div>
          <Link href="/notices" className="text-sm text-uch-green font-medium hover:text-uch-gold
                                            flex items-center gap-1">
            View all <ArrowRight size={14} />
          </Link>
        </div>
        {recentNotices && recentNotices.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {recentNotices.map((n) => (
              <NoticeCard key={n.id} notice={n as Parameters<typeof NoticeCard>[0]["notice"]} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 text-gray-400">
            <FileText size={40} className="mx-auto mb-3 opacity-30" />
            <p>No notices published yet. Check back soon.</p>
          </div>
        )}
      </section>

      {/* ── Compliance banner ── */}
      <section className="bg-uch-green-light border-y border-uch-green/10 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row
                        items-center justify-between gap-6">
          <div>
            <p className="text-uch-green font-bold font-display text-lg">
              Procurement Compliance
            </p>
            <p className="text-sm text-gray-600 mt-1">
              All procurement activities comply with the <strong>Public Procurement Act, 2007</strong>{" "}
              and guidelines of the Bureau of Public Procurement (BPP).
            </p>
          </div>
          <Link href="/about#policy" className="btn-primary shrink-0">
            Read Policy <ArrowRight size={14} />
          </Link>
        </div>
      </section>

      <Footer />
    </>
  );
}
