import { createClient } from '@supabase/supabase-js';

/**
 * Initializes the Supabase database schema for the first time.
 * This function attempts to create necessary tables and policies if they don't exist.
 */
export async function initializeDatabaseSchema() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseServiceKey) {
    console.warn('Supabase service credentials not available for schema initialization');
    return false;
  }

  try {
    // Create admin client with service role key
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Check if table already exists
    const { error: checkError, data: checkData } = await supabase
      .from('notices')
      .select('id', { count: 'exact', head: true });

    if (!checkError) {
      console.log('✅ Notices table already exists');
      return true;
    }

    // Check if it's specifically the table not found error
    if (checkError.message && checkError.message.includes('notices')) {
      console.log('Creating notices table...');

      // Use the direct Postgres connection via Supabase API
      // Unfortunately, Supabase doesn't expose raw SQL execution via the client library
      // This is a known limitation - users must either:
      // 1. Run the SQL manually in Supabase SQL Editor
      // 2. Use Supabase CLI with project linking
      // 3. Create tables via RLS-enabled API calls

      // As a workaround, we'll attempt to create via individual API calls if the RPC exists
      try {
        const { error: rpcError } = await supabase.rpc('exec_sql', {
          query: `
            CREATE TABLE IF NOT EXISTS notices (
              id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
              title TEXT NOT NULL,
              type TEXT NOT NULL CHECK (type IN ('tender', 'notice', 'award', 'advert')),
              summary TEXT,
              body TEXT,
              ref_no TEXT,
              deadline TIMESTAMPTZ,
              published BOOLEAN NOT NULL DEFAULT false,
              created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
              updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
            );

            ALTER TABLE notices ENABLE ROW LEVEL SECURITY;

            CREATE POLICY "Public can read published notices"
              ON notices FOR SELECT
              USING (published = true);

            CREATE POLICY "Authenticated can manage notices"
              ON notices FOR ALL
              USING (auth.role() = 'authenticated');

            CREATE INDEX IF NOT EXISTS idx_notices_type ON notices (type);
            CREATE INDEX IF NOT EXISTS idx_notices_published ON notices (published);
            CREATE INDEX IF NOT EXISTS idx_notices_created_at ON notices (created_at DESC);
            CREATE INDEX IF NOT EXISTS idx_notices_deadline ON notices (deadline);
          `,
        });

        if (!rpcError) {
          console.log('✅ Database schema initialized via RPC');
          return true;
        }
      } catch (rpcError) {
        console.log('⚠️ RPC function not available, schema must be initialized manually');
      }

      // If we get here, inform user to initialize schema manually
      console.error('❌ Unable to auto-initialize database schema');
      console.error('Please run the initialization manually:');
      console.error('1. Go to https://app.supabase.com/');
      console.error('2. Select project lmzdxzcmjycbldnsdapl');
      console.error('3. Go to SQL Editor > New Query');
      console.error('4. Paste and run the contents of SUPABASE-SCHEMA.sql');
      return false;
    }

    // Other error
    console.error('Unexpected error checking schema:', checkError);
    return false;
  } catch (error) {
    console.error('Error initializing database schema:', error);
    return false;
  }
}
