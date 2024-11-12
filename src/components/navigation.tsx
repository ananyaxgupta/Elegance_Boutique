import Link from 'next/link'

export default function Navigation() {
  return (
    <nav className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold hover:text-yellow-300 transition duration-300">Experience Elegance </Link>
        <Link href="/cart" className="hover:text-yellow-300 transition duration-300">Cart</Link>
      </div>
    </nav>
  )
}