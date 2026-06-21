import Link from 'next/link'

export default function Header(){
  return (
    <header className="bg-[url('https://images.unsplash.com/photo-1503264116251-35a269479413?auto=format&fit=crop&w=1600&q=60')] bg-cover bg-center text-white">
      <div className="backdrop-brightness-50">
        <div className="max-w-6xl mx-auto px-6 py-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="text-2xl font-playfair">Mama's Crafts</div>
            <nav className="hidden md:flex gap-6 ml-6">
              <Link href="/">Home</Link>
              <Link href="/about">About</Link>
              <Link href="/shop">Shop</Link>
              <Link href="/workshops">Workshops</Link>
              <Link href="/blog">Blog</Link>
              <Link href="/contact">Contact</Link>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/auth/login"><button className="border rounded-full p-2 bg-white/10">👤</button></Link>
            <Link href="/seller/dashboard"><button className="border rounded-full p-2 bg-white/10">🏷️</button></Link>
            <Link href="/cart"><button className="border rounded-full p-2 bg-white/10">🛒</button></Link>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-6 pb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center py-20">
            <div className="text-left text-white">
              <h1 className="text-4xl md:text-5xl font-playfair font-semibold leading-tight">Creating Magic.\nRaising Babies.\nHealing Ourselves.</h1>
              <p className="mt-6 max-w-md text-lg">For the moms who are tired. Tired of the 9-5. Tired of doing it all. Here, we create beautiful, spiritual art with our kids and build a life with more time, more peace, and more of what matters.</p>
              <div className="mt-6">
                <a className="inline-block bg-rose-300 text-rose-900 px-5 py-3 rounded-md font-medium" href="#">Join Our Mama Circle</a>
              </div>
            </div>
            <div className="hidden md:block">
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
