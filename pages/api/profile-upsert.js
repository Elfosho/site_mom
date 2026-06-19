import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY

const supabaseAdmin = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)

export default async function handler(req,res){
  if(req.method !== 'POST') return res.status(405).end()
  const token = req.headers.authorization?.split('Bearer ')?.[1]
  if(!token) return res.status(401).json({ error: 'Missing token' })

  try{
    // get user data from token
    const { data: userData, error: userErr } = await supabaseAdmin.auth.getUser(token)
    if(userErr || !userData?.user) return res.status(401).json({ error: 'Invalid token' })
    const user = userData.user

    // upsert profile (email provided in body is optional)
    const email = req.body.email || user.email || null
    const { data, error } = await supabaseAdmin
      .from('profiles')
      .upsert({ id: user.id, email }, { onConflict: ['id'] })
      .select()

    if(error) throw error
    return res.status(200).json({ ok: true, data })
  }catch(err){
    console.error(err)
    return res.status(500).json({ error: err.message || String(err) })
  }
}
