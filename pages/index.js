import ProductCard from '../components/ProductCard'

export default function Home(){
  const exampleProducts = [
    {id:1,title:'Moon Wall Hanging',price:45,image:'https://images.unsplash.com/photo-1542834369-f10ebf06d3cb?auto=format&fit=crop&w=600&q=60'},
    {id:2,title:'Magic Mushroom Decor',price:35,image:'https://images.unsplash.com/photo-1544744813-8e3b4f1f3f0f?auto=format&fit=crop&w=600&q=60'},
    {id:3,title:'Healing Stone Set',price:28,image:'https://images.unsplash.com/photo-1544350395-2f8b3c1a6f6d?auto=format&fit=crop&w=600&q=60'},
  ]

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <section className="bg-white rounded-xl shadow-md p-8">
        <h2 className="text-2xl font-playfair mb-4">About Mama's Crafts</h2>
        <p className="text-slate-700">We're three moms on a mission to create a lifestyle filled with intention, creativity, and freedom. Through spiritual art, handmade goods, and healing practices, we're building a business that allows us to be more present for our babies and ourselves.</p>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-4">
            <div className="text-4xl">🌙</div>
            <h3 className="font-semibold mt-2">Spiritual Living</h3>
            <p className="text-sm text-slate-600 mt-2">We honor the moon, the seasons, and our inner magic.</p>
          </div>
          <div className="text-center p-4">
            <div className="text-4xl">🎨</div>
            <h3 className="font-semibold mt-2">Creative Expression</h3>
            <p className="text-sm text-slate-600 mt-2">Art is our therapy. We create to heal, inspire, and connect.</p>
          </div>
          <div className="text-center p-4">
            <div className="text-4xl">🌿</div>
            <h3 className="font-semibold mt-2">Natural Healing</h3>
            <p className="text-sm text-slate-600 mt-2">Plants, stones, and rituals to nourish our souls.</p>
          </div>
        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-2xl font-playfair mb-6">Meet The Mamas</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <article className="bg-white rounded-lg p-6 text-center shadow">
            <img className="w-32 h-32 mx-auto rounded-full object-cover" src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=60" alt="Mama">
            <h3 className="mt-4 font-semibold">Laura Mama</h3>
            <p className="text-sm text-slate-600">Lover of stars, moons, and sunsets. Creates celestial art and guides for gentle parenting.</p>
            <a className="inline-block mt-4 text-rose-600" href="#">View profile</a>
          </article>

          <article className="bg-white rounded-lg p-6 text-center shadow">
            <img className="w-32 h-32 mx-auto rounded-full object-cover" src="https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=400&q=60" alt="Mama">
            <h3 className="mt-4 font-semibold">Bloom Mama</h3>
            <p className="text-sm text-slate-600">Motherhood lover and free spirit. Creates whimsical, magical art for home and heart.</p>
            <a className="inline-block mt-4 text-rose-600" href="#">View profile</a>
          </article>

          <article className="bg-white rounded-lg p-6 text-center shadow">
            <img className="w-32 h-32 mx-auto rounded-full object-cover" src="https://images.unsplash.com/photo-1524503033411-c9566986fc8f?auto=format&fit=crop&w=400&q=60" alt="Mama">
            <h3 className="mt-4 font-semibold">Earth Mama</h3>
            <p className="text-sm text-slate-600">Plant whisperer and healer. Crafts natural objects and herb-based goods.</p>
            <a className="inline-block mt-4 text-rose-600" href="#">View profile</a>
          </article>
        </div>
      </section>

      <section id="shop" className="mt-10">
        <h2 className="text-2xl font-playfair mb-6">Shop Our Creations</h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {exampleProducts.map(p=> (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>

        <div className="mt-6 text-center">
          <a className="inline-block bg-rose-300 text-rose-900 px-4 py-2 rounded-md" href="/shop">Visit Our Shop</a>
        </div>
      </section>
    </div>
  )
}
