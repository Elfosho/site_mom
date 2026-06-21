import { useState } from 'react'
import { supabase } from '../lib/supabaseClient'

export default function ProductForm({onSubmit, initial={}}){
  const [title, setTitle] = useState(initial.title||'')
  const [price, setPrice] = useState(initial.price||'')
  const [description, setDescription] = useState(initial.description||'')
  const [imageFile, setImageFile] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e)=>{
    e.preventDefault()
    setLoading(true)
    try{
      let imageUrl = null
      if(imageFile){
        // upload to Supabase Storage (bucket: product-images)
        const { data: sessionData } = await supabase.auth.getSession()
        const token = sessionData?.session?.access_token
        if(!token) throw new Error('Not authenticated')

        const { data: userData } = await supabase.auth.getUser()
        const userId = userData?.user?.id
        const fileExt = imageFile.name.split('.').pop()
        const filePath = `${userId}/${Date.now()}.${fileExt}`

        const { error: uploadErr } = await supabase.storage.from('product-images').upload(filePath, imageFile)
        if(uploadErr){
          console.error(uploadErr); throw uploadErr
        }
        const { data: publicData } = supabase.storage.from('product-images').getPublicUrl(filePath)
        imageUrl = publicData.publicUrl
      }

      // create product via API
      const { data: session } = await supabase.auth.getSession()
      const token = session?.session?.access_token
      const payload = { title, price, description, images: imageUrl ? [imageUrl] : [], currency: 'USD' }
      const res = await fetch('/api/products',{
        method:'POST',
        headers:{'content-type':'application/json','authorization':`Bearer ${token}`},
        body: JSON.stringify(payload)
      })
      if(!res.ok){
        const err = await res.json()
        throw new Error(err.error || 'Failed')
      }
      const resData = await res.json()
      onSubmit && onSubmit(resData)
      alert('Product created')
    }catch(err){
      console.error(err)
      alert(err.message || String(err))
    }finally{ setLoading(false) }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow">
      <label className="block mb-2">Title<input value={title} onChange={e=>setTitle(e.target.value)} className="w-full border rounded p-2"/></label>
      <label className="block mb-2">Price (USD)<input value={price} onChange={e=>setPrice(e.target.value)} className="w-full border rounded p-2"/></label>
      <label className="block mb-2">Description<textarea value={description} onChange={e=>setDescription(e.target.value)} className="w-full border rounded p-2"/></label>
      <label className="block mb-4">Image<input type="file" onChange={e=>setImageFile(e.target.files?.[0]||null)} /></label>
      <button disabled={loading} className="bg-rose-300 text-rose-900 px-4 py-2 rounded">{loading ? 'Saving...' : 'Save'}</button>
    </form>
  )
}
