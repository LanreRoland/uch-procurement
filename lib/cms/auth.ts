import { createHmac, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const cookieName = "uch_admin_session";
const maxAge = 60 * 60 * 8;

export function getAdminUsername() {
  return getRequiredSecret("ADMIN_USERNAME");
}

function getAdminPassword() {
  return getRequiredSecret("ADMIN_PASSWORD");
}

function getSessionSecret() {
  return getRequiredSecret("ADMIN_SESSION_SECRET");
}

function getRequiredSecret(name: "ADMIN_USERNAME" | "ADMIN_PASSWORD" | "ADMIN_SESSION_SECRET") {
  const value = process.env[name];
  if (!value) {
    throw new Error(`${name} is not configured.`);
  }
  return value;
}

function sign(value: string) {
  return createHmac("sha256", getSessionSecret()).update(value).digest("hex");
}

function safeEqual(a: string, b: string) {
  const left = Buffer.from(a);
  const right = Buffer.from(b);

  if (left.length !== right.length) {
    return false;
  }

  return timingSafeEqual(left, right);
}

export function verifyAdminCredentials(username: string, password: string) {
  const configuredUsername = getAdminUsername();
  const configuredPassword = getAdminPassword();

  return (
    safeEqual(username.trim(), configuredUsername) &&
    safeEqual(password, configuredPassword)
  );
}

export async function createAdminSession(username: string) {
  const issuedAt = Date.now().toString();
  const payload = `${username}:${issuedAt}`;
  const cookieStore = await cookies();

  cookieStore.set(cookieName, `${payload}.${sign(payload)}`, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge,
    path: "/",
  });
}

export async function clearAdminSession() {
  const cookieStore = await cookies();
  cookieStore.delete(cookieName);
}

export async function getAdminSession() {
  const cookieStore = await cookies();
  const value = cookieStore.get(cookieName)?.value;

  if (!value) {
    return null;
  }

  const [payload, signature] = value.split(".");
  if (!payload || !signature || !safeEqual(sign(payload), signature)) {
    return null;
  }

  const [username, issuedAt] = payload.split(":");
  if (!username || !issuedAt) {
    return null;
  }

  const age = Date.now() - Number(issuedAt);
  if (!Number.isFinite(age) || age > maxAge * 1000) {
    return null;
  }

  return { username };
}

export async function requireAdmin() {
  const session = await getAdminSession();

  if (!session) {
    redirect("/admin/login");
  }

  return session;
}
