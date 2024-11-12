import Image from 'next/image'
import Link from 'next/link'

const featuredProducts = [
  { id: 1, name: 'T-Shirt', price: 499, image: '/images/tshirt.jpg' },
  { id: 2, name: 'Jeans', price: 1499, image: '/images/jeans.jpg' },
  { id: 3, name: 'Sneakers', price: 2099, image: '/images/sneakers.jpg' },
  { id: 4, name: 'Hoodie', price: 1299, image: '/images/hoodie.jpg' },
]

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
      <div className="container mx-auto p-8">
        <h1 className="text-5xl font-bold mb-12 text-center text-white shadow-lg">Welcome to My Colorful Clothing Store</h1>
        
        <section className="bg-white bg-opacity-80 rounded-lg shadow-2xl p-8">
          <h2 className="text-3xl font-bold mb-8 text-center text-purple-800">Featured Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product) => (
              <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden transform transition duration-500 hover:scale-105">
                <Image src={product.image} alt={product.name} width={300} height={300} className="w-full h-48 object-cover" />
                <div className="p-4">
                  <h3 className="text-xl font-semibold text-purple-700">{product.name}</h3>
                  <p className="text-gray-600">₹{product.price.toFixed(2)}</p>
                  <Link href={`/product/${product.id}`} className="mt-2 inline-block bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition duration-300">
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}