import { createSupabaseServerClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { PlusCircle, LogOut, FileText, Eye } from "lucide-react";

export default async function AdminDashboard() {
  const supabase = await createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/admin/login");

  const [{ count: total }, { count: published }, { data: recent }] = await Promise.all([
    supabase.from("notices").select("*", { count: "exact", head: true }),
    supabase.from("notices").select("*", { count: "exact", head: true }).eq("published", true),
    supabase.from("notices").select("id, title, type, created_at, published")
      .order("created_at", { ascending: false }).limit(5),
  ]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Admin top bar */}
      <header className="bg-uch-green text-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="font-display font-bold text-sm">UCH Procurement</span>
            <span className="text-white/40 text-xs">|</span>
            <span className="text-white/60 text-xs uppercase tracking-widest">Admin</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-xs text-white/60 hidden sm:block">{user.email}</span>
            <form action="/admin/logout" method="post">
              <button type="submit"
                      className="flex items-center gap-1.5 text-xs text-white/70 hover:text-white transition-colors">
                <LogOut size={14} /> Sign out
              </button>
            </form>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-display text-2xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-sm text-gray-500 mt-0.5">Manage procurement notices and announcements.</p>
          </div>
          <Link href="/admin/notices/new" className="btn-primary">
            <PlusCircle size={16} /> New Notice
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-10">
          {[
            { label: "Total Notices", value: total ?? 0, color: "text-uch-green" },
            { label: "Published",     value: published ?? 0, color: "text-blue-600" },
            { label: "Drafts",        value: (total ?? 0) - (published ?? 0), color: "text-yellow-600" },
          ].map((s) => (
            <div key={s.label} className="card px-6 py-5">
              <p className="text-xs text-gray-500 uppercase tracking-widest mb-1">{s.label}</p>
              <p className={`text-3xl font-bold font-display ${s.color}`}>{s.value}</p>
            </div>
          ))}
        </div>

        {/* Recent notices */}
        <div className="card overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
            <h2 className="font-semibold text-gray-800 text-sm">Recent Notices</h2>
            <Link href="/admin/notices" className="text-xs text-uch-green hover:text-uch-gold transition-colors">
              View all
            </Link>
          </div>
          <div className="divide-y divide-gray-100">
            {recent && recent.length > 0 ? recent.map((n) => (
              <div key={n.id} className="flex items-center justify-between px-6 py-3 hover:bg-gray-50">
                <div className="flex items-center gap-3 min-w-0">
                  <FileText size={15} className="text-gray-400 shrink-0" />
                  <span className="text-sm text-gray-800 truncate">{n.title}</span>
                  <span className={`badge text-[10px] shrink-0 ${n.published ? "badge-notice" : "bg-gray-100 text-gray-500"}`}>
                    {n.published ? "Published" : "Draft"}
                  </span>
                </div>
                <div className="flex items-center gap-3 shrink-0 ml-4">
                  <Link href={`/notices/${n.id}`} target="_blank"
                        className="text-gray-400 hover:text-uch-green transition-colors">
                    <Eye size={14} />
                  </Link>
                  <Link href={`/admin/notices/${n.id}/edit`}
                        className="text-xs text-uch-green hover:text-uch-gold transition-colors font-medium">
                    Edit
                  </Link>
                </div>
              </div>
            )) : (
              <div className="px-6 py-8 text-center text-sm text-gray-400">No notices yet.</div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
