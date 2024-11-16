import React from 'react'

function CartModal({cart,removeFromCart,closeCart}) {
  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center'>
      <div className='bg-white p-6 rounded-lg w-11/12 max-w-lg'>
        <div className='flex justify-between items-center mb-4'>
            <h2 className='text-xl font-bold'>Shopping Cart</h2>
            <button onClick={closeCart} className='text-red-500 font-bold'>X</button>
        </div>
        {cart.length === 0 ? (
            <p className='text-center'>Your cart is empty</p>
        ) : (
            <div>
                {cart.map((item) =>(
                    <div key={item.id} className='flex justify-between items-center mb-4 gap-2'>
                        <img src={item.image} alt={item.title} className='h-12 w-12 object-cover' />
                        <div>
                            <p className='font-semibold'>{item.title}</p>
                            <p className='text-gray-600'>${item.price.toFixed(2)}</p>
                        </div>
                        <button onClick={()=> removeFromCart(item.id)} className='text-red-500 font-bold'>Remove</button>
                    </div>
                ))

                }
            </div>
        )
        
        }
      </div>
    </div>
  )
}

export default CartModal
