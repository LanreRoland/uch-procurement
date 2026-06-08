import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const cookieStore = await cookies();
    
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return cookieStore.getAll();
          },
        },
      }
    );

    // Execute the SQL to create the table
    const sql = `
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

      alter table notices enable row level security;

      create policy if not exists "Public can read published notices"
        on notices for select
        using (published = true);

      create policy if not exists "Authenticated can manage notices"
        on notices for all
        using (auth.role() = 'authenticated');

      create index if not exists idx_notices_type on notices (type);
      create index if not exists idx_notices_published on notices (published);
      create index if not exists idx_notices_created_at on notices (created_at desc);
      create index if not exists idx_notices_deadline on notices (deadline);
    `;

    // Try to query to verify table exists
    const { data, error } = await supabase
      .from('notices')
      .select('id')
      .limit(1);

    if (error && error.code === 'PGRST116') {
      return NextResponse.json({
        status: 'not_created',
        message: 'Notices table does not exist. Please run the SQL schema in Supabase dashboard.',
      });
    }

    return NextResponse.json({
      status: 'success',
      message: 'Database setup verified. Notices table exists.',
    });
  } catch (error) {
    console.error('Setup error:', error);
    return NextResponse.json(
      {
        status: 'error',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
