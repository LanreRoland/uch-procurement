import { notFound } from "next/navigation";
import NoticeForm from "@/components/NoticeForm";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { requireAdmin } from "@/lib/cms/auth";
import { getAdminNotice } from "@/lib/cms/notices";

export default async function EditNoticePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  await requireAdmin();

  const notice = await getAdminNotice(id);
  if (!notice) notFound();

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-uch-green text-white shadow">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center gap-3">
          <Link href="/admin/notices" className="text-white/70 hover:text-white transition-colors">
            <ArrowLeft size={16} />
          </Link>
          <span className="font-display font-bold text-sm">UCH Procurement</span>
          <span className="text-white/40 text-xs">| Edit Notice</span>
        </div>
      </header>
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <h1 className="font-display text-2xl font-bold text-gray-900 mb-8">Edit Notice</h1>
        <div className="card p-8">
          <NoticeForm initialData={notice} />
        </div>
      </main>
    </div>
  );
}
