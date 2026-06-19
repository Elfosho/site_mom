import { useState, useEffect } from 'react'
import ProductForm from '../../components/ProductForm'
import SellerProductsList from '../../components/SellerProductsList'

export default function SellerDashboard(){
  const [products,setProducts] = useState([])

  useEffect(()=>{
    // TODO: fetch seller products
    setProducts([])
  },[])

  const handleCreate = async (data)=>{
    // TODO: upload image and create product via API
    alert('Product saved (stub).')
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <h1 className="text-2xl font-playfair mb-6">Seller dashboard</h1>
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <h3 className="font-semibold mb-4">Add new product</h3>
          <ProductForm onSubmit={handleCreate} />
        </div>
        <div>
          <h3 className="font-semibold mb-4">Your products</h3>
          <SellerProductsList products={products} />
        </div>
      </div>
    </div>
  )
}
