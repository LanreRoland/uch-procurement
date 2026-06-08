const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

console.log('Connecting to Supabase...');
console.log('URL:', supabaseUrl);

const supabase = createClient(supabaseUrl, supabaseKey);

async function setupDatabase() {
  try {
    console.log('\nTesting connection by querying notices table...');
    
    const { data, error } = await supabase.from('notices').select('*').limit(1);
    
    if (error && error.code === 'PGRST116') {
      console.log('✗ Table does not exist - you need to create it in Supabase SQL Editor');
      console.log('   Run the SQL from SUPABASE-SCHEMA.sql');
    } else if (error) {
      console.log('✓ Connection test returned error (expected if table not created):', error.message);
    } else {
      console.log('✓ Notices table already exists and is accessible!');
    }
    
  } catch (err) {
    console.error('Error:', err.message);
  }
}

setupDatabase();
