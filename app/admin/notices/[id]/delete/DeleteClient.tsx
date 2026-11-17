"use client";

import { ArrowLeft, Trash2 } from "lucide-react";
import Link from "next/link";
import { useActionState } from "react";
import { deleteNoticeAction } from "@/app/admin/notices/actions";

export default function DeleteNoticeClient({ id, title }: { id: string; title: string }) {
  const [state, formAction, pending] = useActionState(deleteNoticeAction, null);

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
        {state?.error && (
          <p role="alert" className="text-red-700 bg-red-50 border border-red-200 rounded px-4 py-3 text-sm mb-4">
            {state.error}
          </p>
        )}
        <div className="flex gap-3 justify-center">
          <Link href="/admin/notices" className="btn-secondary text-sm">
            <ArrowLeft size={14} /> Cancel
          </Link>
          <form action={formAction}>
            <input type="hidden" name="id" value={id} />
            <button
              type="submit"
              disabled={pending}
              className="inline-flex items-center gap-2 bg-red-600 text-white px-5 py-2.5 rounded font-semibold text-sm hover:bg-red-700 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
            >
              <Trash2 size={14} />
              {pending ? "Deleting…" : "Delete Notice"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
