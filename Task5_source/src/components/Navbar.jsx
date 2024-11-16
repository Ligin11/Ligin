import React from 'react'

function Navbar({cartCount,openCart}) {
  return (
    <nav className='flex justify-between items-center bg-green-400 text-white p-4 '>
        <h1 className='text-lg font-bold'>Ligin's Store</h1>
        <button
         onClick={openCart}
          className='bg-blue-400 py-2 px-4 rounded hover:bg-blue-800'
        >
          My Cart: 
          <span className='ml-2 bg-red-300 text-white rounded-full px-2'>{cartCount}</span>
        </button>
    </nav>
  )
}

export default Navbar
