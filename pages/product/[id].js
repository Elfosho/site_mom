export default function ProductPage({query}){
  // placeholder product page; replace with fetch from Supabase
  const product = {title:'Moon Wall Hanging',price:45,description:'Handmade macramé moon wall hanging',image:'https://images.unsplash.com/photo-1542834369-f10ebf06d3cb?auto=format&fit=crop&w=600&q=60'}
  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <div className="grid md:grid-cols-2 gap-6 bg-white p-6 rounded shadow">
        <img className="w-full h-96 object-cover rounded" src={product.image} />
        <div>
          <h1 className="text-2xl font-playfair">{product.title}</h1>
          <div className="mt-4 text-rose-700 font-semibold text-xl">${product.price}</div>
          <p className="mt-4 text-slate-700">{product.description}</p>
          <button className="mt-6 bg-rose-300 text-rose-900 px-4 py-2 rounded">Add to cart</button>
        </div>
      </div>
    </div>
  )
}
