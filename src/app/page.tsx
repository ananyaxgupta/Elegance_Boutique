import Image from 'next/image'
import Link from 'next/link'
import './globals.css';

const featuredProducts = [
  { id: 1, name: 'Classic T-Shirt', price: 1999, image: '/images/tshirt.jpg' },
  { id: 2, name: 'Slim Fit Jeans', price: 3999, image: '/images/jeans.jpg' },
  { id: 3, name: 'Summer Dress', price: 4999, image: '/images/dress.jpg' },
  { id: 4, name: 'Leather Jacket', price: 7999, image: '/images/jacket.jpg' },
]

export default function Home() {
  return (
    <div className="min-h-screen">
      <header className="bg-white shadow">
        <nav className="container mx-auto px-6 py-3">
          <div className="flex justify-between items-center">
            <div className="text-2xl font-bold text-primary">FashionStore</div>
            <div className="flex space-x-4">
              <Link href="/" className="text-foreground hover:text-primary">Home</Link>
              <Link href="/products" className="text-foreground hover:text-primary">Products</Link>
              <Link href="/login" className="text-foreground hover:text-primary">Login</Link>
            </div>
          </div>
        </nav>
      </header>

      <main>
        <section className="gradient-bg text-white py-20">
          <div className="container mx-auto text-center">
            <h1 className="text-4xl font-bold mb-4">Welcome to FashionStore</h1>
            <p className="text-xl mb-8">Discover the latest trends in fashion</p>
            <Link href="/products" className="btn btn-secondary">
              Shop Now
            </Link>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">Featured Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {featuredProducts.map((product) => (
                <div key={product.id} className="card">
                  <Image 
                    src={product.image} 
                    alt={product.name} 
                    width={300} 
                    height={300} 
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
                    <p className="text-gray-600 mb-4">₹{(product.price / 100).toFixed(2)}</p>
                    <Link href={`/product/${product.id}`} className="btn btn-primary">
                    View Details
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="gradient-bg text-white py-8">
        <div className="container mx-auto text-center">
          <p>&copy; {new Date().getFullYear()} FashionStore by Ananya Gupta. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}