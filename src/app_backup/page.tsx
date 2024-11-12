import Image from 'next/image'
import Link from 'next/link'

const categories = [
  { id: 1, name: 'Men', image: '/placeholder.svg' },
  { id: 2, name: 'Women', image: '/placeholder.svg' },
  { id: 3, name: 'Kids', image: '/placeholder.svg' },
]

const featuredProducts = [
  { id: 1, name: 'T-Shirt', price: 999, image: '/placeholder.svg' },
  { id: 2, name: 'Jeans', price: 2499, image: '/placeholder.svg' },
  { id: 3, name: 'Sneakers', price: 3999, image: '/placeholder.svg' },
  { id: 4, name: 'Hoodie', price: 1999, image: '/placeholder.svg' },
]

export default function Home() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-8 text-center">Welcome to My Clothing Store</h1>
      
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Shop by Category</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {categories.map((category) => (
            <Link href={`/products?category=${category.name.toLowerCase()}`} key={category.id} className="block">
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <Image src={category.image} alt={category.name} width={300} height={200} className="w-full h-48 object-cover" />
                <div className="p-4">
                  <h3 className="text-xl font-semibold text-center">{category.name}</h3>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
      
      <section>
        <h2 className="text-2xl font-bold mb-4">Featured Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <Image src={product.image} alt={product.name} width={300} height={300} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h3 className="text-lg font-semibold">{product.name}</h3>
                <p className="text-gray-600">₹{product.price}</p>
                <Link href={`/product/${product.id}`} className="mt-2 inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}