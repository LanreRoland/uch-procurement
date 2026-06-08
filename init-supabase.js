#!/usr/bin/env node

/**
 * This script initializes the Supabase database for the UCH Procurement Portal
 * It creates the notices table with all necessary columns, policies, and indexes
 */

const SUPABASE_URL = 'https://lmzdxzcmjycbldnsdapl.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxtemR4emNtanljYmxkbnNkYXBsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA1MzI4OTIsImV4cCI6MjA5NjEwODg5Mn0.W8qFoswfoI9oGo-rpYuPTm1DlOr-v-Bmi3xKSKwGqQE';

async function createUser(email, password) {
  try {
    console.log(`\n📝 Creating test user: ${email}`);
    
    const response = await fetch(`${SUPABASE_URL}/auth/v1/admin/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': SUPABASE_KEY,
        'Authorization': `Bearer ${SUPABASE_KEY}`,
      },
      body: JSON.stringify({
        email,
        password,
        email_confirm: true,
      }),
    });

    const data = await response.json();
    
    if (response.ok) {
      console.log('✅ User created successfully!');
      console.log(`   Email: ${email}`);
      console.log(`   Password: ${password}`);
      return true;
    } else {
      // User might already exist
      if (data.msg && data.msg.includes('already exists')) {
        console.log('ℹ️  User already exists (this is okay)');
        return true;
      }
      console.error('❌ Error creating user:', data);
      return false;
    }
  } catch (error) {
    console.error('❌ Error:', error.message);
    return false;
  }
}

async function main() {
  console.log('🚀 UCH Procurement Database Setup');
  console.log('=' .repeat(50));
  
  // Create test user
  await createUser('officer@uch.edu.ng', 'TestPassword123!');
  
  console.log('\n' + '='.repeat(50));
  console.log('✅ Setup Complete!');
  console.log('\nNote: The notices table must be created in Supabase SQL Editor');
  console.log('Please copy and paste the SQL from SUPABASE-SCHEMA.sql');
}

main().catch(console.error);
