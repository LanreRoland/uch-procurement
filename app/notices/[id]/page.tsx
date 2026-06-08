import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import { Calendar, FileText, ArrowLeft } from "lucide-react";
import Link from "next/link";
import type { NoticeType } from "@/components/NoticeCard";

const typeLabel: Record<NoticeType, string> = {
  tender: "Tender Notice",
  notice: "General Notice",
  award:  "Contract Award",
  advert: "Advert",
};
const typeBadge: Record<NoticeType, string> = {
  tender: "badge-tender",
  notice: "badge-notice",
  award:  "badge-award",
  advert: "badge-advert",
};

export default async function NoticeDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createSupabaseServerClient();
  const { data: notice } = await supabase
    .from("notices")
    .select("*")
    .eq("id", id)
    .eq("published", true)
    .single();

  if (!notice) notFound();

  const type = notice.type as NoticeType;

  return (
    <>
      <Navbar />
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link href="/notices" className="inline-flex items-center gap-1.5 text-sm text-gray-500
                                         hover:text-uch-green mb-8 transition-colors">
          <ArrowLeft size={14} /> Back to Notices
        </Link>

        <article className="bg-white border border-gray-200 rounded-xl shadow-sm p-8">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className={typeBadge[type]}>{typeLabel[type]}</span>
            {notice.ref_no && (
              <span className="text-xs font-mono text-gray-400 bg-gray-50 border border-gray-200
                               px-2.5 py-0.5 rounded">
                Ref: {notice.ref_no}
              </span>
            )}
          </div>

          <h1 className="font-display text-2xl sm:text-3xl font-bold text-gray-900 mb-4 leading-snug">
            {notice.title}
          </h1>

          <div className="flex flex-wrap gap-5 text-sm text-gray-500 border-t border-b
                          border-gray-100 py-3 mb-8">
            <span className="flex items-center gap-1.5">
              <FileText size={14} />
              Published: {new Date(notice.created_at).toLocaleDateString("en-NG", {
                year: "numeric", month: "long", day: "numeric",
              })}
            </span>
            {notice.deadline && (
              <span className="flex items-center gap-1.5 text-red-600 font-medium">
                <Calendar size={14} />
                Submission Deadline: {new Date(notice.deadline).toLocaleDateString("en-NG", {
                  year: "numeric", month: "long", day: "numeric",
                })}
              </span>
            )}
          </div>

          {/* Rich-text body */}
          <div
            className="prose prose-green max-w-none text-gray-700 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: notice.body ?? notice.summary ?? "" }}
          />
        </article>
      </main>
      <Footer />
    </>
  );
}
