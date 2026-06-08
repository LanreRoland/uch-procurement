import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { FileText, Calendar } from "lucide-react";

export type NoticeType = "tender" | "notice" | "award" | "advert";

export interface Notice {
  id: string;
  title: string;
  type: NoticeType;
  summary: string;
  created_at: string;
  deadline?: string | null;
  ref_no?: string | null;
}

const typeLabel: Record<NoticeType, string> = {
  tender: "Tender Notice",
  notice: "General Notice",
  award: "Contract Award",
  advert: "Advert",
};

const typeBadge: Record<NoticeType, string> = {
  tender: "badge-tender",
  notice: "badge-notice",
  award: "badge-award",
  advert: "badge-advert",
};

export default function NoticeCard({ notice }: { notice: Notice }) {
  return (
    <Link href={`/notices/${notice.id}`} className="block card p-5 group">
      <div className="flex items-start justify-between gap-4 mb-2">
        <span className={typeBadge[notice.type]}>{typeLabel[notice.type]}</span>
        {notice.ref_no && (
          <span className="text-xs text-gray-400 font-mono shrink-0">{notice.ref_no}</span>
        )}
      </div>
      <h3 className="font-semibold text-gray-900 group-hover:text-uch-green transition-colors
                     text-base mb-2 leading-snug line-clamp-2">
        {notice.title}
      </h3>
      <p className="text-sm text-gray-500 line-clamp-2 mb-3">{notice.summary}</p>
      <div className="flex items-center gap-4 text-xs text-gray-400">
        <span className="flex items-center gap-1">
          <FileText size={12} />
          {formatDistanceToNow(new Date(notice.created_at), { addSuffix: true })}
        </span>
        {notice.deadline && (
          <span className="flex items-center gap-1 text-red-500">
            <Calendar size={12} />
            Deadline: {new Date(notice.deadline).toLocaleDateString("en-NG")}
          </span>
        )}
      </div>
    </Link>
  );
}
