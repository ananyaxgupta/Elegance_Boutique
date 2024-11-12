'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export default function CheckoutPage() {
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const supabase = createClientComponentClient()

  const handleCheckout = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setLoading(true)

    // In a real application, you would calculate the total based on the cart items
    const totalAmount = 99.99

    const { data, error } = await supabase
      .from('orders')
      .insert([
        { total_amount: totalAmount, status: 'pending' }
      ])

    if (error) {
      console.error('Error creating order:', error)
      alert('There was an error processing your order. Please try again.')
    } else {
      alert('Order placed successfully!')
      router.push('/')
    }

    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6">Checkout</h1>
        <form onSubmit={handleCheckout}>
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
              <Input type="text" id="name" name="name" required className="mt-1" />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
              <Input type="email" id="email" name="email" required className="mt-1" />
            </div>
            <div>
              <label htmlFor="address" className="block text-sm font-medium text-gray-700">Shipping Address</label>
              <Input type="text" id="address" name="address" required className="mt-1" />
            </div>
            <div>
              
              <label htmlFor="card" className="block text-sm font-medium text-gray-700">Card Number</label>
              <Input type="text" id="card" name="card" required className="mt-1" />
            </div>
          </div>
          <Button type="submit" className="w-full mt-6" disabled={loading}>
            {loading ? 'Processing...' : 'Place Order'}
          </Button>
        </form>
      </div>
    </div>
  )
}