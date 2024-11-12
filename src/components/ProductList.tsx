import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabaseClient'

export default function ProductList() {
  const [products, setProducts] = useState([])
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
      console.error('Error fetching products:', error.message)
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