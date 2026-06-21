import { useState, useEffect } from 'react'
import AdminUserList from '../../components/AdminUserList'

export default function AdminDashboard(){
  const [users,setUsers] = useState([])

  useEffect(()=>{
    // TODO: fetch users list from API
    setUsers([])
  },[])

  const grantSeller = async (userId)=>{
    const res = await fetch('/api/grant-seller',{
      method:'POST',
      headers:{'content-type':'application/json'},
      body:JSON.stringify({userId})
    })
    if(res.ok) alert('Role granted (stub)')
    else alert('Error')
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <h1 className="text-2xl font-playfair mb-6">Admin dashboard</h1>
      <p className="mb-6">Use this panel to manage users and grant seller roles.</p>
      <AdminUserList users={users} onGrant={grantSeller} />
    </div>
  )
}
