'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useParams } from 'next/navigation'

const products = [
  { id: 1, name: 'T-Shirt', price: 999, image: '/placeholder.svg', description: 'A comfortable and stylish t-shirt.' },
  { id: 2, name: 'Jeans', price: 2499, image: '/placeholder.svg', description: 'Classic denim jeans for everyday wear.' },
  { id: 3, name: 'Sneakers', price: 3999, image: '/placeholder.svg', description: 'Trendy sneakers for all occasions.' },
  { id: 4, name: 'Hoodie', price: 1999, image: '/placeholder.svg', description: 'A cozy hoodie for chilly days.' },
  { id: 5, name: 'Dress', price: 2999, image: '/placeholder.svg', description: 'An elegant dress for special events.' },
  { id: 6, name: 'Jacket', price: 4499, image: '/placeholder.svg', description: 'A stylish jacket to complete your outfit.' },
]

export default function ProductPage() {
  const { id } = useParams()
  const product = products.find(p => p.id === Number(id))
  const [quantity, setQuantity] = useState(1)

  if (!product) {
    return <div>Product not found</div>
  }

  const addToCart = () => {
    console.log(`Added ${quantity} ${product.name}(s) to cart`)
    // Here you would typically update the cart state or send a request to your backend
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-md p-4">
        <div className="container mx-auto flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold">My Clothing Store</Link>
          <nav>
            <Link href="/cart" className="text-blue-500 hover:text-blue-700">Cart</Link>
          </nav>
        </div>
      </header>
      <main className="container mx-auto p-4">
        <div className="bg-white rounded-lg shadow-md p-6 flex flex-col md:flex-row">
          <div className="md:w-1/2">
            <Image src={product.image} alt={product.name} width={400} height={400} className="w-full h-auto object-cover rounded-lg" />
          </div>
          <div className="md:w-1/2 md:pl-6 mt-4 md:mt-0">
            <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
            <p className="text-gray-600 mb-4">{product.description}</p>
            <p className="text-2xl font-bold mb-4">₹{product.price.toFixed(2)}</p>
            <div className="flex items-center mb-4">
              <label htmlFor="quantity" className="mr-2">Quantity:</label>
              <input
                type="number"
                id="quantity"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="border rounded px-2 py-1 w-16"
              />
            </div>
            <button
              onClick={addToCart}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}