import { useState } from 'react'
import { supabase } from '../../lib/supabaseClient'
import { useRouter } from 'next/router'

export default function Login(){
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const [loading,setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e)=>{
    e.preventDefault(); setLoading(true)
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    if(error){
      alert(error.message)
      setLoading(false)
      return
    }

    // upsert profile if needed
    try{
      const { data: sessionData } = await supabase.auth.getSession()
      const token = sessionData?.session?.access_token
      if(token){
        await fetch('/api/profile-upsert',{
          method:'POST',
          headers:{'content-type':'application/json','authorization':`Bearer ${token}`},
          body: JSON.stringify({ email })
        })
      }
    }catch(err){ console.error(err) }

    setLoading(false)
    router.push('/')
  }

  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-2xl font-playfair mb-4">Login</h1>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow">
        <label className="block mb-2">Email<input value={email} onChange={e=>setEmail(e.target.value)} type="email" className="w-full border rounded p-2"/></label>
        <label className="block mb-4">Password<input value={password} onChange={e=>setPassword(e.target.value)} type="password" className="w-full border rounded p-2"/></label>
        <button disabled={loading} className="bg-rose-300 text-rose-900 px-4 py-2 rounded">Login</button>
      </form>
    </div>
  )
}
