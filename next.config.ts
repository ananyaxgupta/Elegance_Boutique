import { NextConfig } from 'next';

const SUPABASE_URL = 'https://ofuhsvgmprxbfolspthq.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9mdWhzdmdtcHJ4YmZvbHNwdGhxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzA2MTAzOTYsImV4cCI6MjA0NjE4NjM5Nn0.phtRfnIOAU3CXJFJ_pmukeksxlCxhco4mw_RStNCna8';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_SUPABASE_URL: SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: SUPABASE_ANON_KEY,
  },
};

export default nextConfig;