"use server";

import { clearAdminSession, createAdminSession, verifyAdminCredentials } from "@/lib/cms/auth";
import { redirect } from "next/navigation";

export async function loginAdminAction(_state: { error?: string } | null, formData: FormData) {
  const username = String(formData.get("username") || "");
  const password = String(formData.get("password") || "");

  try {
    if (!verifyAdminCredentials(username, password)) {
      return { error: "Invalid username or password." };
    }

    await createAdminSession(username.trim());
  } catch (error) {
    console.error("Admin login configuration error", error);
    return { error: "Admin login is temporarily unavailable. Please contact the site administrator." };
  }

  redirect("/admin");
}

export async function logoutAdminAction() {
  await clearAdminSession();
  redirect("/admin/login");
}
