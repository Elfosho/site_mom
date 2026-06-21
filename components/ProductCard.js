export default function ProductCard({product}){
  return (
    <div className="bg-white rounded p-3 text-center shadow">
      <img className="h-40 w-full object-cover rounded" src={product.image || '/placeholder.jpg'} alt={product.title} />
      <div className="mt-2 text-sm">{product.title}</div>
      <div className="font-semibold">${product.price}</div>
    </div>
  )
}
