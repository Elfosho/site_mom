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
  const { id } = req.query
  const method = req.method

  if(method === 'GET'){
    try{
      const { data, error } = await supabaseAdmin.from('products').select('*').eq('id', id).single()
      if(error) return res.status(404).json({ error: 'Not found' })
      return res.status(200).json({ data })
    }catch(err){
      console.error(err)
      return res.status(500).json({ error: err.message || String(err) })
    }
  }

  if(method === 'PUT' || method === 'DELETE'){
    const token = req.headers.authorization?.split('Bearer ')?.[1]
    if(!token) return res.status(401).json({ error: 'Missing token' })
    try{
      const user = await getUserFromToken(token)
      // verify owner
      const { data: product, error: pErr } = await supabaseAdmin.from('products').select('*').eq('id', id).single()
      if(pErr) return res.status(404).json({ error: 'Not found' })
      if(product.seller_id !== user.id) return res.status(403).json({ error: 'Not owner' })

      if(method === 'PUT'){
        const body = req.body
        const { data, error } = await supabaseAdmin.from('products').update(body).eq('id', id).select()
        if(error) throw error
        return res.status(200).json({ data })
      }

      if(method === 'DELETE'){
        const { data, error } = await supabaseAdmin.from('products').delete().eq('id', id).select()
        if(error) throw error
        return res.status(200).json({ data })
      }
    }catch(err){
      console.error(err)
      return res.status(500).json({ error: err.message || String(err) })
    }
  }

  return res.status(405).end()
}
