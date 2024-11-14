'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { supabase } from '../../lib/supabaseClient'

interface Product {
  id: number
  name: string
  price: number
  image_url: string
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchProducts() {
      try {
        const { data, error } = await supabase
          .from('products')
          .select('*')
        
        if (error) throw error
        setProducts(data || [])
      } catch (error) {
        console.error('Error fetching products:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  if (loading) {
    return <div className="container mx-auto mt-8 text-center">Loading products...</div>
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-white shadow">
        <nav className="container mx-auto px-6 py-3">
          <div className="flex justify-between items-center">
            <div className="text-2xl font-bold text-primary">FashionStore</div>
            <div className="flex space-x-4">
              <Link href="/" className="text-foreground hover:text-primary">Home</Link>
              <Link href="/products" className="text-foreground hover:text-primary">Products</Link>
              <Link href="/login" className="text-foreground hover:text-primary">Login</Link>
            </div>
          </div>
        </nav>
      </header>

      <main className="container mx-auto mt-8">
        <h1 className="text-3xl font-bold mb-8 text-center">Our Products</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <div key={product.id} className="card">
              <Image src={product.image_url} alt={product.name} width={300} height={300} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
                <p className="text-gray-600 mb-4">₹{product.price / 100}</p>
                <Link href={`/products/${product.id}`} className="btn btn-primary w-full text-center">
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      </main>

      <footer className="gradient-bg text-white py-8 mt-16">
        <div className="container mx-auto text-center">
          <p>&copy; 2023 FashionStore. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}