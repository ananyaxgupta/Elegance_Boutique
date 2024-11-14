import { Link } from 'lucide-react'
import ProductList from '../../components/ProductList'

export default function ProductsPage() {
  return (
    <div className="min-h-screen bg-background">
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
              <ProductList />
            </main>
          
            <footer className="gradient-bg text-white py-8 mt-16">
              <div className="container mx-auto text-center">
                <p>&copy; 2023 FashionStore. All rights reserved.</p>
              </div>
            </footer>
          </div>
        )
      }
        