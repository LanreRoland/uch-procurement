import { requireAdmin } from "@/lib/cms/auth";
import { hasDatabaseConfig } from "@/lib/cms/db";

export default async function DiagnosticsPage() {
  await requireAdmin();

  const hasDatabaseUrl = hasDatabaseConfig();
  const hasAdminUsername = Boolean(process.env.ADMIN_USERNAME);
  const hasAdminPassword = Boolean(process.env.ADMIN_PASSWORD);
  const hasSessionSecret = Boolean(process.env.ADMIN_SESSION_SECRET);

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-10">
      <div className="max-w-3xl mx-auto bg-white border border-gray-200 rounded-lg p-8">
        <h1 className="font-display text-2xl font-bold text-gray-900 mb-2">
          CMS Diagnostics
        </h1>
        <p className="text-sm text-gray-500 mb-8">
          Configuration status for the UCH Procurement admin backend.
        </p>

        <div className="space-y-3 text-sm">
          <div className="flex items-center justify-between border-b border-gray-100 pb-3">
            <span className="text-gray-600">PostgreSQL connection</span>
            <span className={hasDatabaseUrl ? "text-green-700 font-semibold" : "text-red-700 font-semibold"}>
              {hasDatabaseUrl ? "Configured" : "Missing DATABASE_URL"}
            </span>
          </div>
          <div className="flex items-center justify-between border-b border-gray-100 pb-3">
            <span className="text-gray-600">Admin username env</span>
            <span className={hasAdminUsername ? "text-green-700 font-semibold" : "text-yellow-700 font-semibold"}>
              {hasAdminUsername ? "Configured" : "Using default"}
            </span>
          </div>
          <div className="flex items-center justify-between border-b border-gray-100 pb-3">
            <span className="text-gray-600">Admin password env</span>
            <span className={hasAdminPassword ? "text-green-700 font-semibold" : "text-yellow-700 font-semibold"}>
              {hasAdminPassword ? "Configured" : "Using default"}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-600">Session secret env</span>
            <span className={hasSessionSecret ? "text-green-700 font-semibold" : "text-yellow-700 font-semibold"}>
              {hasSessionSecret ? "Configured" : "Using default"}
            </span>
          </div>
        </div>
      </div>
    </main>
  );
}
