import { createSupabaseServerClient } from "@/lib/supabase/server";
import { redirect, notFound } from "next/navigation";
import NoticeForm from "@/components/NoticeForm";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default async function EditNoticePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/admin/login");

  const { data: notice } = await supabase.from("notices").select("*").eq("id", id).single();
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
