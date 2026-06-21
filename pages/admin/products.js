import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabaseClient'

export default function AdminProducts(){
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [processing, setProcessing] = useState(null)

  useEffect(()=>{
    fetchPending()
  },[])

  const getToken = async ()=>{
    const { data } = await supabase.auth.getSession()
    return data?.session?.access_token
  }

  const fetchPending = async ()=>{
    setLoading(true)
    try{
      const token = await getToken()
      if(!token) return
      const res = await fetch('/api/products/admin',{ headers: { authorization: `Bearer ${token}` } })
      if(!res.ok) throw new Error('Failed to fetch')
      const json = await res.json()
      setProducts(json.data || [])
    }catch(err){
      console.error(err)
      alert('Failed to load pending products (are you an admin?)')
    }finally{ setLoading(false) }
  }

  const handleAction = async (productId, action)=>{
    if(!confirm(`Are you sure to ${action} this product?`)) return
    setProcessing(productId)
    try{
      const token = await getToken()
      const res = await fetch('/api/products/admin',{
        method: 'POST',
        headers: { 'content-type': 'application/json', authorization: `Bearer ${token}` },
        body: JSON.stringify({ productId, action })
      })
      if(!res.ok) throw new Error('Action failed')
      await fetchPending()
    }catch(err){
      console.error(err)
      alert('Action failed')
    }finally{ setProcessing(null) }
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <h1 className="text-2xl font-playfair mb-6">Pending products moderation</h1>
      {loading ? <div>Loading…</div> : (
        <div className="space-y-4">
          {products.length === 0 && <div className="text-slate-600">No pending products.</div>}
          {products.map(p=> (
            <div key={p.id} className="bg-white p-4 rounded shadow flex gap-4 items-center">
              <img src={p.images?.[0]||'/placeholder.jpg'} className="w-28 h-28 object-cover rounded" />
              <div className="flex-1">
                <div className="font-semibold">{p.title}</div>
                <div className="text-sm text-slate-600">${p.price} • {p.currency}</div>
                <div className="text-sm text-slate-500 mt-2">{p.description}</div>
              </div>
              <div className="flex flex-col gap-2">
                <button disabled={processing===p.id} onClick={()=>handleAction(p.id,'publish')} className="bg-emerald-300 text-emerald-900 px-3 py-1 rounded">Publish</button>
                <button disabled={processing===p.id} onClick={()=>handleAction(p.id,'reject')} className="bg-rose-200 text-rose-900 px-3 py-1 rounded">Reject</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
