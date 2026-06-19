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
  if(req.method !== 'GET') return res.status(405).end()
  const token = req.headers.authorization?.split('Bearer ')?.[1]
  if(!token) return res.status(401).json({ error: 'Missing token' })

  try{
    const user = await getUserFromToken(token)
    // require admin role on profiles
    const { data: profile, error } = await supabaseAdmin.from('profiles').select('role').eq('id', user.id).single()
    if(error) return res.status(403).json({ error: 'Forbidden' })
    if(profile.role !== 'admin') return res.status(403).json({ error: 'Forbidden' })

    const { data, error: usersErr } = await supabaseAdmin.from('profiles').select('*')
    if(usersErr) throw usersErr
    return res.status(200).json({ data })
  }catch(err){
    console.error(err)
    return res.status(500).json({ error: err.message || String(err) })
  }
}
