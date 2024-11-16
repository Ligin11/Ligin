import React from 'react'

function ProductCard({product,addToCart}) {
  return (
    <div className='bg-white shadow-md rounded-lg overflow-hidden'>
        <div className='flex justify-center'>
        <img src={product.image} alt={product.title} className='h-48 w-48 object-full text-center' />
        </div>
        <div className='p-4'>
            <h2 className='text-lg font-bold'>{product.title}</h2>
            <p className='text-gray-700'>${product.price.toFixed(2)}</p>
            <button onClick={() => addToCart(product)} className='mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600'>Add to Cart</button>
        </div>
    </div>
  )
}

export default ProductCard
