import { createSupabaseServerClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { PlusCircle, Eye, Pencil, Trash2, ArrowLeft } from "lucide-react";
import type { NoticeType } from "@/components/NoticeCard";

const typeBadge: Record<NoticeType, string> = {
  tender: "badge-tender",
  notice: "badge-notice",
  award:  "badge-award",
  advert: "badge-advert",
};

export default async function AdminNoticesListPage() {
  const supabase = await createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/admin/login");

  const { data: notices } = await supabase
    .from("notices")
    .select("id, title, type, created_at, published, ref_no")
    .order("created_at", { ascending: false });

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-uch-green text-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/admin" className="text-white/70 hover:text-white transition-colors">
              <ArrowLeft size={16} />
            </Link>
            <span className="font-display font-bold text-sm">UCH Procurement</span>
            <span className="text-white/40 text-xs">| Admin</span>
          </div>
          <Link href="/admin/notices/new" className="flex items-center gap-1.5 text-xs bg-uch-gold
                                                      text-white px-3 py-1.5 rounded font-semibold
                                                      hover:bg-uch-gold-dark transition-colors">
            <PlusCircle size={13} /> New Notice
          </Link>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <h1 className="font-display text-2xl font-bold text-gray-900 mb-6">All Notices</h1>
        <div className="card overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-5 py-3 text-left text-xs uppercase tracking-widest text-gray-500 font-semibold">Title</th>
                <th className="px-5 py-3 text-left text-xs uppercase tracking-widest text-gray-500 font-semibold hidden sm:table-cell">Type</th>
                <th className="px-5 py-3 text-left text-xs uppercase tracking-widest text-gray-500 font-semibold hidden md:table-cell">Ref No.</th>
                <th className="px-5 py-3 text-left text-xs uppercase tracking-widest text-gray-500 font-semibold hidden md:table-cell">Date</th>
                <th className="px-5 py-3 text-left text-xs uppercase tracking-widest text-gray-500 font-semibold">Status</th>
                <th className="px-5 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {notices && notices.length > 0 ? notices.map((n) => (
                <tr key={n.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-5 py-3 font-medium text-gray-900 max-w-xs truncate">{n.title}</td>
                  <td className="px-5 py-3 hidden sm:table-cell">
                    <span className={typeBadge[n.type as NoticeType]}>{n.type}</span>
                  </td>
                  <td className="px-5 py-3 hidden md:table-cell text-gray-400 font-mono text-xs">{n.ref_no ?? "—"}</td>
                  <td className="px-5 py-3 hidden md:table-cell text-gray-500">
                    {new Date(n.created_at).toLocaleDateString("en-NG")}
                  </td>
                  <td className="px-5 py-3">
                    <span className={`badge text-[10px] ${n.published ? "badge-notice" : "bg-gray-100 text-gray-500"}`}>
                      {n.published ? "Published" : "Draft"}
                    </span>
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-3 justify-end">
                      <Link href={`/notices/${n.id}`} target="_blank"
                            className="text-gray-400 hover:text-uch-green transition-colors" title="View">
                        <Eye size={15} />
                      </Link>
                      <Link href={`/admin/notices/${n.id}/edit`}
                            className="text-gray-400 hover:text-uch-green transition-colors" title="Edit">
                        <Pencil size={15} />
                      </Link>
                      <Link href={`/admin/notices/${n.id}/delete`}
                            className="text-gray-400 hover:text-red-600 transition-colors" title="Delete">
                        <Trash2 size={15} />
                      </Link>
                    </div>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={6} className="px-5 py-10 text-center text-gray-400">No notices yet.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
