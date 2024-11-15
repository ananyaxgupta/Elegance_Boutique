'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { createClient } from '@supabase/supabase-js'

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

export default function ProductPage() {
  const params = useParams()
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return

    async function fetchProduct() {
      try {
        setLoading(true)
        setError(null)
        
        // Convert the id to string if it's an array
        const productId = Array.isArray(params.id) ? params.id[0] : params.id

        const { data, error: supabaseError } = await supabase
          .from('products')
          .select('*')
          .eq('id', productId)
          .single()
        
        if (supabaseError) throw supabaseError
        
        if (!data) {
          setError('Product not found')
          return
        }

        setProduct(data)
      } catch (err) {
        setError('Error fetching product. Please try again later.')
        console.error('Error fetching product:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchProduct()
  }, [params.id, mounted])

  if (!mounted) return null

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-xl text-gray-600">Loading product...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
        <div className="text-xl text-red-500 mb-4">{error}</div>
        <Link href="/" className="text-primary hover:underline">
          Return to Home
        </Link>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
        <div className="text-xl text-gray-800 mb-4">Product not found</div>
        <Link href="/" className="text-primary hover:underline">
          Return to Home
        </Link>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <nav className="container mx-auto px-6 py-3">
          <div className="flex justify-between items-center">
            <Link href="/" className="text-2xl font-bold text-primary">
              FashionStore
            </Link>
            <div className="flex space-x-4">
              <Link href="/" className="text-gray-800 hover:text-primary">Home</Link>
              <Link href="/products" className="text-gray-800 hover:text-primary">Products</Link>
              <Link href="/login" className="text-gray-800 hover:text-primary">Login</Link>
            </div>
          </div>
        </nav>
      </header>

      <main className="container mx-auto p-4">
        <div className="bg-white rounded-lg shadow-md p-6 mt-6">
          <div className="md:flex md:space-x-6">
            <div className="md:w-1/2">
              <div className="relative h-96 w-full">
                <Image
                  src={product.image_url}
                  alt={product.name}
                  fill
                  className="rounded-lg object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
              </div>
            </div>
            <div className="md:w-1/2 mt-6 md:mt-0">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>
              <p className="text-gray-600 mb-6">{product.description}</p>
              <p className="text-3xl font-bold text-primary mb-6">₹{(product.price / 100).toFixed(2)}</p>
              <div className="space-y-4">
                <button className="w-full bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary-light transition duration-300">
                  Add to Cart
                </button>
                <Link 
                  href="/" 
                  className="block text-center text-primary hover:underline mt-4"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-gray-800 text-white py-8 mt-16">
        <div className="container mx-auto text-center">
          <p>&copy; {new Date().getFullYear()} FashionStore. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}