import { notFound } from "next/navigation";
import DeleteClient from "./DeleteClient";
import { requireAdmin } from "@/lib/cms/auth";
import { getAdminNotice } from "@/lib/cms/notices";

export default async function DeleteNoticePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  await requireAdmin();

  const notice = await getAdminNotice(id);
  if (!notice) notFound();

  return <DeleteClient id={notice.id} title={notice.title} />;
}
