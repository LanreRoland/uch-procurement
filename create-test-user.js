#!/usr/bin/env node

const SUPABASE_URL = 'https://lmzdxzcmjycbldnsdapl.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxtemR4emNtanljYmxkbnNkYXBsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA1MzI4OTIsImV4cCI6MjA5NjEwODg5Mn0.W8qFoswfoI9oGo-rpYuPTm1DlOr-v-Bmi3xKSKwGqQE';

async function signUpUser(email, password) {
  try {
    console.log(`\n📝 Creating test user: ${email}`);
    
    const response = await fetch(`${SUPABASE_URL}/auth/v1/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': SUPABASE_KEY,
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const data = await response.json();
    
    if (response.ok) {
      console.log('✅ User created successfully!');
      console.log(`   Email: ${email}`);
      console.log(`   Password: ${password}`);
      return true;
    } else {
      console.log('Response:', JSON.stringify(data, null, 2));
      if (data.msg && (data.msg.includes('already exists') || data.msg.includes('duplicate'))) {
        console.log('ℹ️  User already exists (this is okay)');
        return true;
      }
      console.error('❌ Error creating user:', data.msg || data.error);
      return false;
    }
  } catch (error) {
    console.error('❌ Error:', error.message);
    return false;
  }
}

async function main() {
  console.log('🚀 UCH Procurement - Create Test User');
  console.log('='.repeat(50));
  
  await signUpUser('officer@uch-ibadan.org.ng', 'TestPassword123!');
  
  console.log('\n' + '='.repeat(50));
  console.log('✅ Done!');
  console.log('\nYou can now test the app by:');
  console.log('1. Go to http://localhost:3001/admin/login');
  console.log('2. Enter email: officer@uch.edu.ng');
  console.log('3. Enter password: TestPassword123!');
  console.log('4. Create a procurement notice!');
}

main().catch(console.error);
