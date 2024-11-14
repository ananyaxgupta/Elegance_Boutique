/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useEffect, useState } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

export default function AdminDashboard() {
  const [orders, setOrders] = useState<any[]>([])
  const supabase = createClientComponentClient()

  useEffect(() => {
    const fetchOrders = async () => {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Error fetching orders:', error)
      } else {
        setOrders(data)
      }
    }

    fetchOrders()
  }, [])

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Recent Orders</h2>
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left p-2">Order ID</th>
              <th className="text-left p-2">Total Amount</th>
              <th className="text-left p-2">Status</th>
              <th className="text-left p-2">Date</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order: any) => (
              <tr key={order.id} className="border-b">
                <td className="p-2">{order.id}</td>
                <td className="p-2">${order.total_amount.toFixed(2)}</td>
                <td className="p-2">{order.status}</td>
                <td className="p-2">{new Date(order.created_at).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}