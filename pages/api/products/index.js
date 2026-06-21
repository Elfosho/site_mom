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
  if(method === 'GET'){
    // list published products or seller's products if ?seller=me
    const { seller } = req.query
    try{
      if(seller === 'me'){
        const token = req.headers.authorization?.split('Bearer ')?.[1]
        if(!token) return res.status(401).json({ error: 'Missing token' })
        const user = await getUserFromToken(token)
        const { data, error } = await supabaseAdmin.from('products').select('*').eq('seller_id', user.id)
        if(error) throw error
        return res.status(200).json({ data })
      }

      // public listing (published)
      const { data, error } = await supabaseAdmin.from('products').select('*').eq('status','published')
      if(error) throw error
      return res.status(200).json({ data })
    }catch(err){
      console.error(err)
      return res.status(500).json({ error: err.message || String(err) })
    }
  }

  if(method === 'POST'){
    // create product (seller only)
    const token = req.headers.authorization?.split('Bearer ')?.[1]
    if(!token) return res.status(401).json({ error: 'Missing token' })
    const body = req.body
    if(!body) return res.status(400).json({ error: 'Missing body' })

    try{
      const user = await getUserFromToken(token)
      // verify role
      const { data: profile } = await supabaseAdmin.from('profiles').select('role').eq('id', user.id).single()
      if(!profile || profile.role !== 'seller') return res.status(403).json({ error: 'User is not a seller' })

      const toInsert = {
        seller_id: user.id,
        title: body.title,
        description: body.description,
        price: body.price ? parseInt(body.price,10) : 0,
        currency: body.currency || 'USD',
        images: body.images || [],
        status: body.status || 'pending'
      }

      const { data, error } = await supabaseAdmin.from('products').insert([toInsert]).select()
      if(error) throw error
      return res.status(200).json({ data })
    }catch(err){
      console.error(err)
      return res.status(500).json({ error: err.message || String(err) })
    }
  }

  return res.status(405).end()
}
