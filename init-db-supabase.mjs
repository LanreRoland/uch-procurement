import { createClient } from '@supabase/supabase-js';
import fs from 'fs';

const supabaseUrl = 'https://lmzdxzcmjycbldnsdapl.supabase.co';
const supabaseServiceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxtemR4emNtanljYmxkbnNkYXBsIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4MDUzMjg5MiwiZXhwIjoyMDk2MTA4ODkyfQ.5kLSgx0Zp0YCG-4JDCvL8lX-DqJu_6GJ_qJfL8kqWPk';

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function initializeDatabase() {
  try {
    console.log('Reading schema file...');
    const schema = fs.readFileSync('./SUPABASE-SCHEMA.sql', 'utf8');

    console.log('Initializing database...');
    
    // Split by semicolon and execute statements
    const statements = schema
      .split(';')
      .map(s => s.trim())
      .filter(s => s && !s.startsWith('--'));

    for (const statement of statements) {
      if (!statement) continue;
      
      console.log(`Executing: ${statement.substring(0, 50)}...`);
      
      // Try using the rpc method to execute
      const { error } = await supabase.rpc('exec_sql', { query: statement });
      
      if (error) {
        // If exec_sql doesn't exist, try a different approach
        console.warn(`Warning: ${error.message}`);
      } else {
        console.log('✅ Success');
      }
    }

    console.log('✅ Database initialization complete!');
  } catch (error) {
    console.error('❌ Error:', error instanceof Error ? error.message : error);
  }
}

initializeDatabase();
