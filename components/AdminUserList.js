export default function AdminUserList({users=[], onGrant}){
  return (
    <div className="space-y-4">
      {users.map(u=> (
        <div key={u.id} className="bg-white p-4 rounded flex items-center justify-between">
          <div>
            <div className="font-semibold">{u.email}</div>
            <div className="text-sm text-slate-600">role: {u.role||'buyer'}</div>
          </div>
          <div>
            <button onClick={()=>onGrant(u.id)} className="bg-rose-300 text-rose-900 px-3 py-1 rounded">Grant seller</button>
          </div>
        </div>
      ))}
    </div>
  )
}
