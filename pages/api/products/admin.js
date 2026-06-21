import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY

const supabaseAdmin = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)

async function getUserFromToken(token){
  const { data, error } = await supabaseAdmin.auth.getUser(token)
  if(error) throw error
  return data.user
}

export default async function handler(req,res){
  const method = req.method

  // Verify admin
  const token = req.headers.authorization?.split('Bearer ')?.[1]
  if(!token) return res.status(401).json({ error: 'Missing token' })

  try{
    const user = await getUserFromToken(token)
    const { data: profile, error: pErr } = await supabaseAdmin.from('profiles').select('role').eq('id', user.id).single()
    if(pErr) return res.status(403).json({ error: 'Forbidden' })
    if(profile.role !== 'admin') return res.status(403).json({ error: 'Forbidden' })

    if(method === 'GET'){
      // list pending products
      const { data, error } = await supabaseAdmin.from('products').select('*').eq('status','pending').order('created_at',{ ascending:false })
      if(error) throw error
      return res.status(200).json({ data })
    }

    if(method === 'POST'){
      const { productId, action } = req.body
      if(!productId || !action) return res.status(400).json({ error: 'Missing productId or action' })

      if(action === 'publish'){
        const { data, error } = await supabaseAdmin.from('products').update({ status: 'published' }).eq('id', productId).select()
        if(error) throw error
        return res.status(200).json({ data })
      }

      if(action === 'reject'){
        // mark rejected (or delete)
        const { data, error } = await supabaseAdmin.from('products').update({ status: 'rejected' }).eq('id', productId).select()
        if(error) throw error
        return res.status(200).json({ data })
      }

      return res.status(400).json({ error: 'Unknown action' })
    }

    return res.status(405).end()
  }catch(err){
    console.error(err)
    return res.status(500).json({ error: err.message || String(err) })
  }
}
