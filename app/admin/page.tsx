import Link from "next/link";
import { AlertCircle, Eye, FileText, LogOut, PlusCircle } from "lucide-react";
import { requireAdmin } from "@/lib/cms/auth";
import { getNoticeStats, listAdminNotices } from "@/lib/cms/notices";
import { hasDatabaseConfig } from "@/lib/cms/db";

export default async function AdminDashboard() {
  const user = await requireAdmin();

  if (!hasDatabaseConfig()) {
    return (
      <AdminShell username={user.username}>
        <div className="max-w-3xl">
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
            <div className="flex items-start gap-3">
              <AlertCircle size={22} className="text-yellow-700 mt-0.5 shrink-0" />
              <div>
                <h1 className="font-display text-2xl font-bold text-gray-900 mb-2">
                  Admin Login Is Working
                </h1>
                <p className="text-sm text-gray-700 leading-6">
                  The CMS database is not connected yet. Add a PostgreSQL connection string as
                  <span className="font-mono font-semibold"> DATABASE_URL </span>
                  in Vercel, then run the SQL in
                  <span className="font-mono font-semibold"> database.sql </span>
                  to enable posting notices.
                </p>
              </div>
            </div>
          </div>
        </div>
      </AdminShell>
    );
  }

  const [stats, recent] = await Promise.all([
    getNoticeStats(),
    listAdminNotices(5),
  ]);

  return (
    <AdminShell username={user.username}>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-8">
          <div>
            <h1 className="font-display text-2xl font-bold text-gray-900">Content Dashboard</h1>
            <p className="text-sm text-gray-500 mt-0.5">Manage notices and notifications displayed on the public portal.</p>
          </div>
          <Link href="/admin/notices/new" className="btn-primary">
            <PlusCircle size={16} /> New Notice
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-10">
          {[
            { label: "Total Notices", value: stats.total, color: "text-uch-green" },
            { label: "Published", value: stats.published, color: "text-blue-600" },
            { label: "Drafts", value: stats.drafts, color: "text-yellow-600" },
          ].map((stat) => (
            <div key={stat.label} className="card px-6 py-5">
              <p className="text-xs text-gray-500 uppercase tracking-widest mb-1">{stat.label}</p>
              <p className={`text-3xl font-bold font-display ${stat.color}`}>{stat.value}</p>
            </div>
          ))}
        </div>

        <div className="card overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
            <h2 className="font-semibold text-gray-800 text-sm">Recent Notices</h2>
            <Link href="/admin/notices" className="text-xs text-uch-green hover:text-uch-gold transition-colors">
              View all
            </Link>
          </div>
          <div className="divide-y divide-gray-100">
            {recent.length > 0 ? recent.map((notice) => (
              <div key={notice.id} className="flex items-center justify-between px-6 py-3 hover:bg-gray-50">
                <div className="flex items-center gap-3 min-w-0">
                  <FileText size={15} className="text-gray-400 shrink-0" />
                  <span className="text-sm text-gray-800 truncate">{notice.title}</span>
                  <span className={`badge text-[10px] shrink-0 ${notice.published ? "badge-notice" : "bg-gray-100 text-gray-500"}`}>
                    {notice.published ? "Published" : "Draft"}
                  </span>
                </div>
                <div className="flex items-center gap-3 shrink-0 ml-4">
                  {notice.published && (
                    <Link href={`/notices/${notice.id}`} target="_blank" className="text-gray-400 hover:text-uch-green transition-colors">
                      <Eye size={14} />
                    </Link>
                  )}
                  <Link href={`/admin/notices/${notice.id}/edit`} className="text-xs text-uch-green hover:text-uch-gold transition-colors font-medium">
                    Edit
                  </Link>
                </div>
              </div>
            )) : (
              <div className="px-6 py-8 text-center text-sm text-gray-400">No notices yet.</div>
            )}
          </div>
        </div>
    </AdminShell>
  );
}

function AdminShell({
  username,
  children,
}: {
  username: string;
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-uch-green text-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="font-display font-bold text-sm">UCH Procurement</span>
            <span className="text-white/40 text-xs">|</span>
            <span className="text-white/60 text-xs uppercase tracking-widest">Admin CMS</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-xs text-white/60 hidden sm:block">{username}</span>
            <form action="/admin/logout" method="post">
              <button type="submit" className="flex items-center gap-1.5 text-xs text-white/70 hover:text-white transition-colors">
                <LogOut size={14} /> Sign out
              </button>
            </form>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {children}
      </main>
    </div>
  );
}
