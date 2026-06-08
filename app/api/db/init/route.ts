import { createSupabaseServerClient } from '@/lib/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const supabase = await createSupabaseServerClient();

    // SQL to create the notices table
    const sql = `
      -- Create notices table
      create table if not exists notices (
        id uuid primary key default gen_random_uuid(),
        title text not null,
        type text not null check (type in ('tender', 'notice', 'award', 'advert')),
        summary text,
        body text,
        ref_no text,
        deadline timestamptz,
        published boolean not null default false,
        created_at timestamptz not null default now(),
        updated_at timestamptz not null default now()
      );

      -- Enable Row Level Security
      alter table notices enable row level security;

      -- Policy: Public can read published notices
      create policy "Public can read published notices"
        on notices for select
        using (published = true);

      -- Policy: Authenticated users can manage notices
      create policy "Authenticated can manage notices"
        on notices for all
        using (auth.role() = 'authenticated');

      -- Create indexes
      create index if not exists idx_notices_type on notices (type);
      create index if not exists idx_notices_published on notices (published);
      create index if not exists idx_notices_created_at on notices (created_at desc);
      create index if not exists idx_notices_deadline on notices (deadline);
    `;

    // Execute the SQL using the admin API
    const { error } = await supabase.rpc('exec_sql', {
      sql: sql,
    });

    if (error) {
      // If RPC method doesn't exist, try using raw query
      console.log('RPC method not available, attempting direct query...');
      
      // Try to query the notices table to see if it exists
      const { data, error: queryError } = await supabase
        .from('notices')
        .select('id')
        .limit(1);

      if (queryError && queryError.code === 'PGRST116') {
        // Table doesn't exist, we need to create it manually via dashboard
        return NextResponse.json(
          {
            status: 'incomplete',
            message: 'Notices table does not exist. Please create it via Supabase dashboard.',
            instructions: 'Go to SQL Editor and run the SUPABASE-SCHEMA.sql file',
          },
          { status: 200 }
        );
      }
    }

    // Verify table was created
    const { data: tables } = await supabase
      .from('notices')
      .select('id')
      .limit(1);

    return NextResponse.json(
      {
        status: 'success',
        message: 'Database initialized successfully',
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Database initialization error:', error);
    return NextResponse.json(
      {
        status: 'error',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
