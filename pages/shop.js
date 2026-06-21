import { useEffect, useState } from 'react'
import ProductCard from '../../components/ProductCard'

export default function Shop(){
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(()=>{
    (async ()=>{
      try{
        const res = await fetch('/api/products')
        const data = await res.json()
        setItems(data.data || [])
      }catch(err){
        console.error(err)
      }finally{ setLoading(false) }
    })()
  },[])

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <h1 className="text-2xl font-playfair mb-6">Shop</h1>
      {loading ? (
        <div>Loading…</div>
      ) : (
        <div>
          {items.length === 0 ? (
            <div className="text-slate-600">No items available yet.</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {items.map(i=> <ProductCard key={i.id} product={{...i, price:i.price}} />)}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
