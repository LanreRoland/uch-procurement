"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/cms/auth";
import { createNotice, deleteNotice, updateNotice } from "@/lib/cms/notices";
import { noticeTypes, type NoticeInput, type NoticeType } from "@/lib/cms/types";

function parseNoticeForm(formData: FormData): NoticeInput {
  const type = String(formData.get("type") || "notice");

  if (!noticeTypes.includes(type as NoticeType)) {
    throw new Error("Choose a valid notice type.");
  }

  return {
    title: String(formData.get("title") || ""),
    type: type as NoticeType,
    summary: String(formData.get("summary") || ""),
    body: String(formData.get("body") || ""),
    ref_no: String(formData.get("ref_no") || ""),
    deadline: String(formData.get("deadline") || "") || null,
    published: formData.get("published") === "on",
  };
}

function refreshNoticePaths() {
  revalidatePath("/");
  revalidatePath("/notices");
  revalidatePath("/admin");
  revalidatePath("/admin/notices");
}

export async function saveNoticeAction(_state: { error?: string } | null, formData: FormData) {
  await requireAdmin();

  try {
    const id = String(formData.get("id") || "");
    const input = parseNoticeForm(formData);

    if (id) {
      await updateNotice(id, input);
      revalidatePath(`/notices/${id}`);
    } else {
      const newId = await createNotice(input);
      revalidatePath(`/notices/${newId}`);
    }

    refreshNoticePaths();
  } catch (error) {
    return {
      error: error instanceof Error ? error.message : "Unable to save notice.",
    };
  }

  redirect("/admin/notices");
}

export async function deleteNoticeAction(_state: { error?: string } | null, formData: FormData) {
  await requireAdmin();

  const id = String(formData.get("id") || "");
  if (!id) {
    return { error: "A notice ID is required." };
  }

  try {
    await deleteNotice(id);
    revalidatePath(`/notices/${id}`);
    refreshNoticePaths();
  } catch (error) {
    console.error("Unable to delete notice", error);
    return {
      error: error instanceof Error ? error.message : "Unable to delete the notice.",
    };
  }

  redirect("/admin/notices");
}
