#!/usr/bin/env node

/**
 * UCH Procurement - Database Initialization Script
 * This script creates the notices table and policies in Supabase
 */

const SUPABASE_URL = 'https://lmzdxzcmjycbldnsdapl.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxtemR4emNtanljYmxkbnNkYXBsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA1MzI4OTIsImV4cCI6MjA5NjEwODg5Mn0.W8qFoswfoI9oGo-rpYuPTm1DlOr-v-Bmi3xKSKwGqQE';

async function initializeDatabase() {
  console.log('🚀 Initializing UCH Procurement Database');
  console.log('='.repeat(60));

  try {
    // Step 1: Try to fetch existing notices to see if table exists
    console.log('\n1️⃣  Checking if notices table exists...');
    const checkResponse = await fetch(`${SUPABASE_URL}/rest/v1/notices?limit=1`, {
      method: 'GET',
      headers: {
        'apikey': SUPABASE_KEY,
        'Content-Type': 'application/json',
      },
    });

    if (checkResponse.ok) {
      console.log('✅ Notices table already exists!');
      console.log('\n' + '='.repeat(60));
      console.log('✅ Database is ready to use!');
      return true;
    }

    if (checkResponse.status === 404) {
      console.log('❌ Notices table does not exist');
      console.log('\n⚠️  MANUAL SETUP REQUIRED');
      console.log('='.repeat(60));
      console.log('\nThe notices table needs to be created manually in Supabase.');
      console.log('\n📋 Steps to create the table:');
      console.log('');
      console.log('1. Go to: https://supabase.com/dashboard/project/lmzdxzcmjycbldnsdapl/sql/new');
      console.log('2. Copy the SQL from: SUPABASE-SCHEMA.sql');
      console.log('3. Paste it into the SQL Editor');
      console.log('4. Click the "Run" button');
      console.log('5. Wait for "Success. No rows returned" message');
      console.log('');
      console.log('After you complete these steps, run this script again.');
      console.log('='.repeat(60));
      return false;
    }

    console.log('Error checking table:', checkResponse.status);
    return false;
  } catch (error) {
    console.error('❌ Error:', error instanceof Error ? error.message : error);
    return false;
  }
}

// Run the initialization
initializeDatabase().then(success => {
  if (!success) {
    process.exit(1);
  }
});
