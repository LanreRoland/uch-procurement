export const noticeTypes = ["tender", "notice", "award", "advert"] as const;

export type NoticeType = (typeof noticeTypes)[number];

export interface Notice {
  id: string;
  title: string;
  type: NoticeType;
  summary: string;
  body: string;
  ref_no: string | null;
  deadline: string | null;
  published: boolean;
  created_at: string;
  updated_at: string;
}

export interface NoticeInput {
  title: string;
  type: NoticeType;
  summary: string;
  body: string;
  ref_no?: string | null;
  deadline?: string | null;
  published: boolean;
}

export interface NoticeStats {
  total: number;
  published: number;
  drafts: number;
}
