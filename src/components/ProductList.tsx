import { useState, useEffect } from 'react'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseKey)

interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
}

export default function ProductList() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchProducts()
  }, [])

  async function fetchProducts() {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('products')
        .select('*')
      
      if (error) throw error
      setProducts(data || [])
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error fetching products:', error.message)
      } else {
        console.error('Error fetching products:', error)
      }
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <div>Loading products...</div>

  return (
    <div>
      <h2>Our Products</h2>
      {products.map((product) => (
        <div key={product.id}>
          <h3>{product.name}</h3>
          <p>Price: ₹{product.price.toFixed(2)}</p>
          <p>{product.description}</p>
        </div>
      ))}
    </div>
  )
}