import ProductCard from '../components/ProductCard'

export default function Shop(){
  const items = [
    {id:1,title:'Moon Wall Hanging',price:45,image:'https://images.unsplash.com/photo-1542834369-f10ebf06d3cb?auto=format&fit=crop&w=600&q=60'},
    {id:2,title:'Magic Mushroom Decor',price:35,image:'https://images.unsplash.com/photo-1544744813-8e3b4f1f3f0f?auto=format&fit=crop&w=600&q=60'},
    {id:3,title:'Healing Stone Set',price:28,image:'https://images.unsplash.com/photo-1544350395-2f8b3c1a6f6d?auto=format&fit=crop&w=600&q=60'},
    {id:4,title:'Botanical Art Print',price:22,image:'https://images.unsplash.com/photo-1514996937319-344454492b37?auto=format&fit=crop&w=600&q=60'},
    {id:5,title:'Mama Ritual Candle',price:28,image:'https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=600&q=60'},
  ]

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <h1 className="text-2xl font-playfair mb-6">Shop</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {items.map(i=> <ProductCard key={i.id} product={i} />)}
      </div>
    </div>
  )
}
