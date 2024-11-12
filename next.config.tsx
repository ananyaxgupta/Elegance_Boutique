import React from 'react';

const MyComponent: React.FC = () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    console.error('Supabase environment variables are missing');
    return null;
  }

  return (
    <div>
      <h1>Welcome , Elegance Boutique</h1>
      <p>Supabase URL: {supabaseUrl}</p>
    </div>
  );
};

export default MyComponent;
