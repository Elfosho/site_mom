import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY

export default async function handler(req,res){
  if(req.method !== 'POST') return res.status(405).end()
  const { userId } = req.body
  if(!SUPABASE_SERVICE_ROLE_KEY) return res.status(500).json({error:'Missing SUPABASE_SERVICE_ROLE_KEY'})
  if(!userId) return res.status(400).json({error:'Missing userId'})

  const supabaseAdmin = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)

  try{
    // Two approaches: 1) modify a profiles table; 2) set custom claim / app_metadata.
    // Here we update a `profiles` table that should exist in your Supabase DB: {id, email, role}
    const { data, error } = await supabaseAdmin
      .from('profiles')
      .update({ role: 'seller' })
      .eq('id', userId)

    if(error) throw error
    return res.status(200).json({ ok: true, data })
  }catch(err){
    console.error(err)
    return res.status(500).json({ error: err.message || String(err) })
  }
}
