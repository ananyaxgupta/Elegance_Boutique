'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

// This would typically come from a global state or context
const initialCartItems = [
  { id: 1, name: 'T-Shirt', price: 999, quantity: 2, image: '/placeholder.svg' },
  { id: 3, name: 'Sneakers', price: 3999, quantity: 1, image: '/placeholder.svg' },
]

export default function CartPage() {
  const [cartItems, setCartItems] = useState(initialCartItems)
  const [isCheckingOut, setIsCheckingOut] = useState(false)

  const removeFromCart = (id: number) => {
    setCartItems(cartItems.filter(item => item.id !== id))
  }

  const updateQuantity = (id: number, newQuantity: number) => {
    setCartItems(cartItems.map(item => 
      item.id === id ? { ...item, quantity: newQuantity } : item
    ))
  }

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)

  const handleCheckout = () => {
    setIsCheckingOut(true)
    // Here you would typically send the order to your backend
    setTimeout(() => {
      alert('Thank you for your purchase!')
      setCartItems([])
      setIsCheckingOut(false)
    }, 2000)
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            {cartItems.map((item) => (
              <div key={item.id} className="flex items-center mb-4 pb-4 border-b">
                <Image src={item.image} alt={item.name} width={80} height={80} className="rounded-md mr-4" />
                <div className="flex-grow">
                  <h2 className="text-lg font-semibold">{item.name}</h2>
                  <p className="text-gray-600">₹{item.price.toFixed(2)}</p>
                  <div className="flex items-center mt-2">
                    <label htmlFor={`quantity-${item.id}`} className="mr-2">Quantity:</label>
                    <input
                      type="number"
                      id={`quantity-${item.id}`}
                      min="1"
                      value={item.quantity}
                      onChange={(e) => updateQuantity(item.id, Number(e.target.value))}
                      className="border rounded px-2 py-1 w-16"
                    />
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="ml-4 text-red-500 hover:text-red-700"
                    >
                      Remove
                    </button>
                  </div>
                </div>
                <p className="font-semibold">₹{(item.price * item.quantity).toFixed(2)}</p>
              </div>
            ))}
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Total:</h2>
              <p className="text-2xl font-bold">₹{total.toFixed(2)}</p>
            </div>
            <button 
              onClick={handleCheckout}
              disabled={isCheckingOut}
              className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-blue-300"
            >
              {isCheckingOut ? 'Processing...' : 'Proceed to Checkout'}
            </button>
          </div>
        </>
      )}
    </div>
  )
}