import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import NoticeCard from "@/components/NoticeCard";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { FileText } from "lucide-react";
import type { NoticeType } from "@/components/NoticeCard";

const typeLabels: Record<string, string> = {
  tender: "Tender Notices",
  notice: "General Notices",
  award:  "Contract Awards",
  advert: "Adverts",
};

interface SearchParams { type?: string }

export default async function NoticesPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;
  const typeFilter = params.type as NoticeType | undefined;

  const supabase = await createSupabaseServerClient();
  let query = supabase
    .from("notices")
    .select("id, title, type, summary, created_at, deadline, ref_no")
    .eq("published", true)
    .order("created_at", { ascending: false });

  if (typeFilter && Object.keys(typeLabels).includes(typeFilter)) {
    query = query.eq("type", typeFilter);
  }

  const { data: notices } = await query.limit(50);

  const activeLabel = typeFilter ? typeLabels[typeFilter] : "All Notices";

  const tabs = [
    { label: "All", href: "/notices" },
    { label: "Tenders",  href: "/notices?type=tender" },
    { label: "Awards",   href: "/notices?type=award"  },
    { label: "Notices",  href: "/notices?type=notice" },
    { label: "Adverts",  href: "/notices?type=advert" },
  ];

  return (
    <>
      <Navbar />
      <div className="bg-uch-green/5 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <p className="text-xs text-gray-500 uppercase tracking-widest mb-1">Procurement</p>
          <h1 className="font-display text-3xl font-bold text-uch-green">{activeLabel}</h1>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 bg-white sticky top-16 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex gap-1 overflow-x-auto">
          {tabs.map((t) => {
            const isActive =
              t.href === "/notices" ? !typeFilter : t.href.includes(typeFilter ?? "___");
            return (
              <a
                key={t.href}
                href={t.href}
                className={`px-4 py-3 text-sm font-medium border-b-2 whitespace-nowrap transition-colors ${
                  isActive
                    ? "border-uch-green text-uch-green"
                    : "border-transparent text-gray-500 hover:text-uch-green"
                }`}
              >
                {t.label}
              </a>
            );
          })}
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {notices && notices.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {notices.map((n) => (
              <NoticeCard key={n.id} notice={n as Parameters<typeof NoticeCard>[0]["notice"]} />
            ))}
          </div>
        ) : (
          <div className="text-center py-24 text-gray-400">
            <FileText size={48} className="mx-auto mb-4 opacity-25" />
            <p className="text-lg font-medium">No notices found.</p>
            <p className="text-sm mt-1">Check back later for updates.</p>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
