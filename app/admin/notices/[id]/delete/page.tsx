import { createSupabaseServerClient } from "@/lib/supabase/server";
import { redirect, notFound } from "next/navigation";
import DeleteClient from "./DeleteClient";

export default async function DeleteNoticePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/admin/login");

  const { data: notice } = await supabase
    .from("notices").select("id, title").eq("id", id).single();
  if (!notice) notFound();

  return <DeleteClient id={notice.id} title={notice.title} />;
}
