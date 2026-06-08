"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createSupabaseClient } from "@/lib/supabase/client";
import { Trash2, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function DeleteNoticeClient({ id, title }: { id: string; title: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleDelete() {
    setLoading(true);
    const supabase = createSupabaseClient();
    const { error } = await supabase.from("notices").delete().eq("id", id);
    if (error) { setError(error.message); setLoading(false); }
    else { router.push("/admin/notices"); router.refresh(); }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full card p-8 text-center">
        <div className="w-14 h-14 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Trash2 size={24} className="text-red-600" />
        </div>
        <h1 className="font-display text-xl font-bold text-gray-900 mb-2">Delete Notice</h1>
        <p className="text-gray-600 text-sm mb-6">
          Are you sure you want to permanently delete{" "}
          <span className="font-semibold text-gray-900">&ldquo;{title}&rdquo;</span>?
          This action cannot be undone.
        </p>
        {error && <p className="text-red-600 text-sm mb-4">{error}</p>}
        <div className="flex gap-3 justify-center">
          <Link href="/admin/notices"
                className="btn-secondary text-sm">
            <ArrowLeft size={14} /> Cancel
          </Link>
          <button onClick={handleDelete} disabled={loading}
                  className="inline-flex items-center gap-2 bg-red-600 text-white px-5 py-2.5 rounded
                             font-semibold text-sm hover:bg-red-700 transition-colors disabled:opacity-60">
            <Trash2 size={14} />
            {loading ? "Deleting…" : "Yes, Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}
