'use client'

import { useParams } from 'next/navigation'
import Link from 'next/link'

const products = [
  { id: 1, name: 'T-Shirt', price: 499, description: 'A comfortable and stylish t-shirt.' },
  { id: 2, name: 'Jeans', price: 1499, description: 'Classic denim jeans for everyday wear.' },
  { id: 3, name: 'Sneakers', price: 2099, description: 'Trendy sneakers for all occasions.' },
  { id: 4, name: 'Hoodie', price: 1299, description: 'A cozy hoodie for chilly days.' },
]

export default function ProductPage() {
  const { id } = useParams()
  const product = products.find(p => p.id === Number(id))

  if (!product) {
    return <div className="container mx-auto p-4">Product not found</div>
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
      <p className="text-gray-600 mb-4">{product.description}</p>
      <p className="text-2xl font-bold mb-4">₹{product.price.toFixed(2)}</p>
      <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
        Add to Basket
      </button>
      <Link href="/" className="ml-4 text-blue-500 hover:underline">
        Back to Home
      </Link>
    </div>
  )
}