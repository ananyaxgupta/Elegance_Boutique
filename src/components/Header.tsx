'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { User } from '@supabase/supabase-js'

export default function Header() {
  const [user, setUser] = useState<User | null>(null)
  const supabase = createClientComponentClient()

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null)
    })

    return () => subscription.unsubscribe()
  }, [supabase.auth])

  const handleSignOut = async () => {
    await supabase.auth.signOut()
  }

  return (
    <header className="bg-white shadow-md p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-primary">FashionStore</Link>
        <nav>
          <ul className="flex space-x-4">
            <li><Link href="/" className="text-primary hover:text-primary-light">Home</Link></li>
            <li><Link href="/products" className="text-primary hover:text-primary-light">Products</Link></li>
            <li><Link href="/cart" className="text-primary hover:text-primary-light">Cart</Link></li>
            {user ? (
              <li><button onClick={handleSignOut} className="text-primary hover:text-primary-light">Sign Out</button></li>
            ) : (
              <li><Link href="/auth" className="text-primary hover:text-primary-light">Sign In</Link></li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  )
}