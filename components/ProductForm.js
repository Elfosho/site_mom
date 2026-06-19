import { useState } from 'react'

export default function ProductForm({onSubmit, initial={}}){
  const [title, setTitle] = useState(initial.title||'')
  const [price, setPrice] = useState(initial.price||'')
  const [description, setDescription] = useState(initial.description||'')
  const [image, setImage] = useState(null)

  return (
    <form onSubmit={(e)=>{e.preventDefault(); onSubmit({title,price,description,image})}} className="bg-white p-6 rounded shadow">
      <label className="block mb-2">Title<input value={title} onChange={e=>setTitle(e.target.value)} className="w-full border rounded p-2"/></label>
      <label className="block mb-2">Price<input value={price} onChange={e=>setPrice(e.target.value)} className="w-full border rounded p-2"/></label>
      <label className="block mb-2">Description<textarea value={description} onChange={e=>setDescription(e.target.value)} className="w-full border rounded p-2"/></label>
      <label className="block mb-4">Image<input type="file" onChange={e=>setImage(e.target.files?.[0]||null)} /></label>
      <button className="bg-rose-300 text-rose-900 px-4 py-2 rounded">Save</button>
    </form>
  )
}
