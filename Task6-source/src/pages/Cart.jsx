import React from "react";

const Cart = ({ cart, setCart }) => {
  const increment = (id) => {
    setCart(
      cart.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decrement = (id) => {
    setCart(
      cart.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const removeFromCart = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="p-4">
      {cart.length === 0 ? (
        <h2>Your cart is empty.</h2>
      ) : (
        <div>
          {cart.map((item) => (
            <div key={item.id} className="flex justify-between items-center mb-4">
              <div className='w-39'>
                <h2 className='w-[250px] font-bold'>{item.title}</h2>
                <p>${item.price}</p>
              </div>
              <div className="flex justify-between">
                <button
                  onClick={() => decrement(item.id)}
                  className="bg-red-500 text-white px-2"
                >
                  -
                </button>
                <span className="px-4">{item.quantity}</span>
                <button
                  onClick={() => increment(item.id)}
                  className="bg-green-500 text-white px-2"
                >
                  +
                </button>
              </div>
              <p>${(item.price * item.quantity).toFixed(2)}</p>
              <button
                onClick={() => removeFromCart(item.id)}
                className="bg-gray-500 text-white px-4"
              >
                Remove
              </button>
            
            </div>
          ))}
          <h2>Total: ${(totalPrice * 0.9).toFixed(2)} (10% Discount Applied)</h2>
        </div>
      )}
    </div>
  );
};

export default Cart;