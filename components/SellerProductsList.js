export default function SellerProductsList({products=[]}){
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {products.map(p=> (
        <div key={p.id} className="bg-white p-4 rounded shadow">
          <div className="flex gap-4">
            <img src={p.image||'/placeholder.jpg'} className="w-24 h-24 object-cover rounded" />
            <div>
              <div className="font-semibold">{p.title}</div>
              <div className="text-sm text-slate-600">${p.price}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
