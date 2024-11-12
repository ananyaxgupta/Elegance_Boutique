'use client'

import './globals.css'
import { Inter } from 'next/font/google'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null)
    })

    return () => {
      authListener.subscription.unsubscribe()
    }
  }, [])

  const handleSignOut = async () => {
    await supabase.auth.signOut()
  }

  return (
    <html lang="en">
      <body className={inter.className}>
        <header className="bg-white shadow-md p-4">
          <div className="container mx-auto flex justify-between items-center">
            <Link href="/" className="text-2xl font-bold">My Clothing Store</Link>
            <nav>
              <ul className="flex space-x-4">
                <li><Link href="/" className="text-blue-500 hover:text-blue-700">Home</Link></li>
                <li><Link href="/products" className="text-blue-500 hover:text-blue-700">Products</Link></li>
                <li><Link href="/cart" className="text-blue-500 hover:text-blue-700">Cart</Link></li>
                {user ? (
                  <li><button onClick={handleSignOut} className="text-blue-500 hover:text-blue-700">Sign Out</button></li>
                ) : (
                  <li><Link href="/auth" className="text-blue-500 hover:text-blue-700">Sign In</Link></li>
                )}
              </ul>
            </nav>
          </div>
        </header>
        <main className="min-h-screen bg-gray-100">
          {children}
        </main>
        <footer className="bg-gray-800 text-white p-4">
          <div className="container mx-auto text-center">
            <p>&copy; 2024 My Clothing Store. All rights reserved.</p>
          </div>
        </footer>
      </body>
    </html>
  )
}