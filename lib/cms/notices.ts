import { query } from "@/lib/cms/db";
import { noticeTypes, type Notice, type NoticeInput, type NoticeStats, type NoticeType } from "@/lib/cms/types";

const noticeColumns = `
  id,
  title,
  type,
  summary,
  body,
  ref_no,
  deadline,
  published,
  created_at,
  updated_at
`;

function normalizeNotice(row: Notice): Notice {
  return {
    ...row,
    created_at: new Date(row.created_at).toISOString(),
    updated_at: new Date(row.updated_at).toISOString(),
    deadline: row.deadline ? new Date(row.deadline).toISOString() : null,
  };
}

export function validateNoticeInput(input: NoticeInput): NoticeInput {
  const title = input.title.trim();
  const type = input.type;
  const summary = input.summary.trim();
  const body = input.body.trim();
  const refNo = input.ref_no?.trim() || null;
  const deadline = input.deadline || null;

  if (!title) {
    throw new Error("Notice title is required.");
  }

  if (!noticeTypes.includes(type)) {
    throw new Error("Choose a valid notice type.");
  }

  if (summary.length > 600) {
    throw new Error("Summary should be 600 characters or less.");
  }

  return {
    title,
    type,
    summary,
    body,
    ref_no: refNo,
    deadline,
    published: Boolean(input.published),
  };
}

export async function getNoticeStats(): Promise<NoticeStats> {
  const { rows } = await query<{ total: string; published: string }>(`
    SELECT
      count(*)::text AS total,
      count(*) FILTER (WHERE published = true)::text AS published
    FROM notices
  `);

  const total = Number(rows[0]?.total ?? 0);
  const published = Number(rows[0]?.published ?? 0);

  return {
    total,
    published,
    drafts: total - published,
  };
}

export async function listAdminNotices(limit?: number): Promise<Notice[]> {
  const values: unknown[] = [];
  let limitClause = "";

  if (limit) {
    values.push(limit);
    limitClause = "LIMIT $1";
  }

  const { rows } = await query<Notice>(
    `SELECT ${noticeColumns} FROM notices ORDER BY created_at DESC ${limitClause}`,
    values
  );

  return rows.map(normalizeNotice);
}

export async function listPublishedNotices(options: { type?: NoticeType; limit?: number } = {}): Promise<Notice[]> {
  const values: unknown[] = [];
  const where = ["published = true"];

  if (options.type) {
    values.push(options.type);
    where.push(`type = $${values.length}`);
  }

  let limitClause = "";
  if (options.limit) {
    values.push(options.limit);
    limitClause = `LIMIT $${values.length}`;
  }

  const { rows } = await query<Notice>(
    `SELECT ${noticeColumns}
     FROM notices
     WHERE ${where.join(" AND ")}
     ORDER BY created_at DESC
     ${limitClause}`,
    values
  );

  return rows.map(normalizeNotice);
}

export async function getAdminNotice(id: string): Promise<Notice | null> {
  const { rows } = await query<Notice>(
    `SELECT ${noticeColumns} FROM notices WHERE id = $1 LIMIT 1`,
    [id]
  );

  return rows[0] ? normalizeNotice(rows[0]) : null;
}

export async function getPublishedNotice(id: string): Promise<Notice | null> {
  const { rows } = await query<Notice>(
    `SELECT ${noticeColumns} FROM notices WHERE id = $1 AND published = true LIMIT 1`,
    [id]
  );

  return rows[0] ? normalizeNotice(rows[0]) : null;
}

export async function createNotice(input: NoticeInput): Promise<string> {
  const notice = validateNoticeInput(input);
  const { rows } = await query<{ id: string }>(
    `INSERT INTO notices (title, type, summary, body, ref_no, deadline, published)
     VALUES ($1, $2, $3, $4, $5, $6, $7)
     RETURNING id`,
    [
      notice.title,
      notice.type,
      notice.summary,
      notice.body,
      notice.ref_no,
      notice.deadline,
      notice.published,
    ]
  );

  return rows[0].id;
}

export async function updateNotice(id: string, input: NoticeInput): Promise<void> {
  const notice = validateNoticeInput(input);
  await query(
    `UPDATE notices
     SET title = $1,
         type = $2,
         summary = $3,
         body = $4,
         ref_no = $5,
         deadline = $6,
         published = $7,
         updated_at = now()
     WHERE id = $8`,
    [
      notice.title,
      notice.type,
      notice.summary,
      notice.body,
      notice.ref_no,
      notice.deadline,
      notice.published,
      id,
    ]
  );
}

export async function deleteNotice(id: string): Promise<void> {
  const { rowCount } = await query<{ id: string }>(
    "DELETE FROM notices WHERE id = $1 RETURNING id",
    [id]
  );

  if (rowCount !== 1) {
    throw new Error("The notice was not found or had already been deleted.");
  }
}
