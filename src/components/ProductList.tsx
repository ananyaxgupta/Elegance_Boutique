'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { createClient } from '@supabase/supabase-js'

// Create Supabase client outside of component to avoid re-creation
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? ''
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? ''
const supabase = createClient(supabaseUrl, supabaseKey)

interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  image_url: string;
  category: string;
}

export default function ProductList() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (mounted) {
      fetchProducts()
    }
  }, [mounted])

  async function fetchProducts() {
    try {
      setLoading(true)
      setError(null)

      const { data, error: supabaseError } = await supabase
        .from('products')
        .select('*')
      
      if (supabaseError) {
        throw new Error(supabaseError.message)
      }

      setProducts(data || [])
    } catch (err) {
      setError('Error fetching products. Please try again later.')
      console.error('Error details:', err)
    } finally {
      setLoading(false)
    }
  }

  // Prevent hydration issues by not rendering until mounted
  if (!mounted) {
    return null
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-10">Loading products...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-10">
          <p className="text-red-500 mb-4">{error}</p>
          <button 
            onClick={fetchProducts}
            className="btn btn-primary"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6 text-center">Our Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="relative h-48">
              <Image 
                src={product.image_url} 
                alt={product.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
              <p className="text-gray-600 mb-2">₹{(product.price / 100).toFixed(2)}</p>
              <p className="text-sm text-gray-500 mb-4">{product.description}</p>
              <Link 
                href={`/product/${product.id}`} 
                className="btn btn-primary w-full text-center block"
              >
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}