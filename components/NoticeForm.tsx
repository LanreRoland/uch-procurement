"use client";

import { useActionState, useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import { Eye, Save } from "lucide-react";
import Link from "next/link";
import { saveNoticeAction } from "@/app/admin/notices/actions";

const noticeTypes = ["tender", "notice", "award", "advert"] as const;

interface NoticeFormProps {
  initialData?: {
    id?: string;
    title?: string;
    type?: string;
    summary?: string;
    body?: string;
    ref_no?: string | null;
    deadline?: string | null;
    published?: boolean;
  };
}

export default function NoticeForm({ initialData = {} }: NoticeFormProps) {
  const isEdit = Boolean(initialData.id);
  const [published, setPublished] = useState(initialData.published ?? false);
  const [state, formAction, saving] = useActionState(saveNoticeAction, null);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({ placeholder: "Write the full notice content here..." }),
    ],
    content: initialData.body ?? "",
    editorProps: {
      attributes: {
        class: "min-h-[260px] prose prose-sm max-w-none focus:outline-none px-4 py-3 text-gray-800",
      },
    },
    immediatelyRender: false,
  });

  return (
    <form action={formAction} className="space-y-6">
      {initialData.id && <input type="hidden" name="id" value={initialData.id} />}
      <input type="hidden" name="body" value={editor?.getHTML() ?? initialData.body ?? ""} />

      {state?.error && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-lg">
          {state.error}
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">
          Notice Title <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          name="title"
          required
          defaultValue={initialData.title ?? ""}
          className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-uch-green focus:border-transparent"
          placeholder="e.g. Invitation to Tender for Supply of Medical Equipment"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Type</label>
          <select
            name="type"
            defaultValue={initialData.type ?? "tender"}
            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-uch-green bg-white"
          >
            {noticeTypes.map((type) => (
              <option key={type} value={type}>
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Reference No.</label>
          <input
            type="text"
            name="ref_no"
            defaultValue={initialData.ref_no ?? ""}
            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-uch-green"
            placeholder="e.g. UCH/PROC/2026/001"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Deadline</label>
          <input
            type="date"
            name="deadline"
            defaultValue={initialData.deadline?.slice(0, 10) ?? ""}
            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-uch-green"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">Short Summary</label>
        <textarea
          name="summary"
          defaultValue={initialData.summary ?? ""}
          rows={2}
          className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-uch-green resize-none"
          placeholder="One or two sentence summary shown on listings..."
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">Full Content</label>
        <div className="flex flex-wrap gap-1 border border-gray-300 border-b-0 rounded-t-lg px-2 py-1.5 bg-gray-50">
          {[
            { label: "B", action: () => editor?.chain().focus().toggleBold().run(), active: editor?.isActive("bold") },
            { label: "I", action: () => editor?.chain().focus().toggleItalic().run(), active: editor?.isActive("italic") },
            { label: "H2", action: () => editor?.chain().focus().toggleHeading({ level: 2 }).run(), active: editor?.isActive("heading", { level: 2 }) },
            { label: "H3", action: () => editor?.chain().focus().toggleHeading({ level: 3 }).run(), active: editor?.isActive("heading", { level: 3 }) },
            { label: "UL", action: () => editor?.chain().focus().toggleBulletList().run(), active: editor?.isActive("bulletList") },
            { label: "OL", action: () => editor?.chain().focus().toggleOrderedList().run(), active: editor?.isActive("orderedList") },
          ].map(({ label, action, active }) => (
            <button
              key={label}
              type="button"
              onMouseDown={(event) => {
                event.preventDefault();
                action();
              }}
              className={`px-2.5 py-1 text-xs rounded font-medium transition-colors ${
                active ? "bg-uch-green text-white" : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
        <div className="border border-gray-300 rounded-b-lg bg-white">
          <EditorContent editor={editor} />
        </div>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between pt-2">
        <label className="flex items-center gap-2.5 cursor-pointer select-none">
          <div className="relative">
            <input
              type="checkbox"
              name="published"
              checked={published}
              onChange={(event) => setPublished(event.target.checked)}
              className="sr-only peer"
            />
            <div className="w-10 h-6 bg-gray-200 rounded-full peer-checked:bg-uch-green transition-colors" />
            <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform peer-checked:translate-x-4 shadow" />
          </div>
          <span className="text-sm font-medium text-gray-700">
            {published ? "Published (live)" : "Draft (hidden)"}
          </span>
        </label>

        <div className="flex items-center gap-3">
          <Link href="/admin/notices" className="btn-secondary text-xs px-4 py-2">
            Cancel
          </Link>
          {isEdit && initialData.id && (
            <Link
              href={`/notices/${initialData.id}`}
              target="_blank"
              className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-uch-green transition-colors"
            >
              <Eye size={13} /> Preview
            </Link>
          )}
          <button type="submit" disabled={saving} className="btn-primary text-xs px-5 py-2.5 disabled:opacity-60">
            <Save size={13} /> {saving ? "Saving..." : isEdit ? "Update Notice" : "Create Notice"}
          </button>
        </div>
      </div>
    </form>
  );
}
