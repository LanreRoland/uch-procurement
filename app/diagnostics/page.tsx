import { createSupabaseServerClient } from "@/lib/supabase/server";

export default async function DiagnosticsPage() {
  let diagnostics = {
    supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL ? "✅ Set" : "❌ Missing",
    supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? "✅ Set" : "❌ Missing",
    connectionStatus: "Checking...",
    testQuery: "Checking...",
  };

  try {
    const supabase = await createSupabaseServerClient();
    
    // Test basic connection by querying notices
    const { data, error } = await supabase
      .from("notices")
      .select("count")
      .limit(1);

    if (error) {
      diagnostics.connectionStatus = `❌ Error: ${error.message}`;
      diagnostics.testQuery = `❌ Query failed: ${error.code}`;
    } else {
      diagnostics.connectionStatus = "✅ Connected to Supabase";
      diagnostics.testQuery = `✅ Database query successful`;
    }
  } catch (err) {
    diagnostics.connectionStatus = `❌ Error: ${err instanceof Error ? err.message : "Unknown error"}`;
    diagnostics.testQuery = "❌ Failed to test connection";
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">System Diagnostics</h1>
        
        <div className="bg-white rounded-lg shadow p-6 space-y-4">
          <div>
            <h2 className="text-lg font-semibold text-gray-800">Environment Variables</h2>
            <ul className="mt-4 space-y-2 text-sm font-mono">
              <li>NEXT_PUBLIC_SUPABASE_URL: <span className="font-bold">{diagnostics.supabaseUrl}</span></li>
              <li>NEXT_PUBLIC_SUPABASE_ANON_KEY: <span className="font-bold">{diagnostics.supabaseKey}</span></li>
            </ul>
          </div>

          <hr className="my-4" />

          <div>
            <h2 className="text-lg font-semibold text-gray-800">Supabase Connection</h2>
            <ul className="mt-4 space-y-2 text-sm font-mono">
              <li>Connection Status: <span className="font-bold">{diagnostics.connectionStatus}</span></li>
              <li>Test Query: <span className="font-bold">{diagnostics.testQuery}</span></li>
            </ul>
          </div>

          <hr className="my-4" />

          <div className="text-sm text-gray-600">
            <p><strong>Next Steps:</strong></p>
            <ol className="mt-2 list-decimal list-inside space-y-1">
              <li>If env vars are missing: Add them to Vercel project settings</li>
              <li>If connection fails: Check Supabase project is active</li>
              <li>If query fails: Verify the "notices" table exists and RLS is configured</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}
