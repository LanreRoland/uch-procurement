import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import NoticeCard from "@/components/NoticeCard";
import { FileText } from "lucide-react";
import type { NoticeType } from "@/components/NoticeCard";
import { listPublishedNotices } from "@/lib/cms/notices";
import { hasDatabaseConfig } from "@/lib/cms/db";

const typeLabels: Record<string, string> = {
  tender: "Tender Notices",
  notice: "General Notices",
  award: "Contract Awards",
  advert: "Adverts",
};

interface SearchParams {
  type?: string;
}

export default async function NoticesPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;
  const typeFilter = params.type as NoticeType | undefined;
  const validType = typeFilter && Object.keys(typeLabels).includes(typeFilter) ? typeFilter : undefined;

  let notices = null;
  let error = null;

  try {
    notices = hasDatabaseConfig()
      ? await listPublishedNotices({ type: validType, limit: 50 })
      : [];
  } catch (err) {
    console.error("Error fetching notices:", err);
    error = err instanceof Error ? err.message : "Unknown error";
  }

  const activeLabel = validType ? typeLabels[validType] : "All Notices";

  const tabs = [
    { label: "All", href: "/notices" },
    { label: "Tenders", href: "/notices?type=tender" },
    { label: "Awards", href: "/notices?type=award" },
    { label: "Notices", href: "/notices?type=notice" },
    { label: "Adverts", href: "/notices?type=advert" },
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

      <div className="border-b border-gray-200 bg-white sticky top-16 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex gap-1 overflow-x-auto">
          {tabs.map((tab) => {
            const isActive = tab.href === "/notices" ? !validType : tab.href.includes(validType ?? "___");
            return (
              <a
                key={tab.href}
                href={tab.href}
                className={`px-4 py-3 text-sm font-medium border-b-2 whitespace-nowrap transition-colors ${
                  isActive
                    ? "border-uch-green text-uch-green"
                    : "border-transparent text-gray-500 hover:text-uch-green"
                }`}
              >
                {tab.label}
              </a>
            );
          })}
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {error ? (
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-red-800">
            <p className="font-semibold">Error loading notices</p>
            <p className="text-sm mt-1">{error}</p>
          </div>
        ) : notices && notices.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {notices.map((notice) => (
              <NoticeCard key={notice.id} notice={notice} />
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
