'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase environment variables')
}

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
  const { id } = useParams()
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchProduct() {
      try {
        setLoading(true)
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .eq('id', id)
          .single()
        
        if (error) throw error
        setProduct(data)
      } catch (error) {
        setError('Error fetching product. Please try again later.')
        console.error('Error fetching product:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchProduct()
  }, [id])

  if (loading) return <div className="container mx-auto p-4 text-gray-800">Loading product...</div>
  if (error) return <div className="container mx-auto p-4 text-red-500">{error}</div>
  if (!product) return <div className="container mx-auto p-4 text-gray-800">Product not found</div>

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <nav className="container mx-auto px-6 py-3">
          <div className="flex justify-between items-center">
            <div className="text-2xl font-bold text-primary">FashionStore</div>
            <div className="flex space-x-4">
              <Link href="/" className="text-gray-800 hover:text-primary">Home</Link>
              <Link href="/products" className="text-gray-800 hover:text-primary">Products</Link>
              <Link href="/login" className="text-gray-800 hover:text-primary">Login</Link>
            </div>
          </div>
        </nav>
      </header>

      <main className="container mx-auto p-4">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="md:flex">
            <div className="md:flex-shrink-0">
              <Image
                src={product.image_url}
                alt={product.name}
                width={400}
                height={400}
                className="rounded-lg object-cover md:w-48"
              />
            </div>
            <div className="mt-4 md:mt-0 md:ml-6">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
              <p className="text-gray-600 mb-4">{product.description}</p>
              <p className="text-2xl font-bold text-primary mb-4">₹{(product.price / 100).toFixed(2)}</p>
              <button className="bg-primary text-white px-4 py-2 rounded hover:bg-primary-light transition duration-300">
                Add to Cart
              </button>
              <Link href="/products" className="ml-4 text-primary hover:underline">
                Back to Products
              </Link>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-gray-800 text-white py-8 mt-16">
        <div className="container mx-auto text-center">
          <p>&copy; 2023 FashionStore. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}