import React, { useState, useEffect } from "react";

const Products = ({ cart, setCart }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  const addToCart = (product) => {
    const exists = cart.find((item) => item.id === product.id);
    if (exists) {
      setCart(
        cart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      );
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  return (
    <div className="p-4 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {products.map((product) => (
        <div key={product.id} className="border p-4 flex flex-col items-center">
          <img src={product.image} alt={product.title} className="h-32" />
          <h2 className="font-bold mt-2">{product.title}</h2>
          <p>${product.price}</p>
          <button
            onClick={() => addToCart(product)}
            className="bg-green-500 text-white mt-2 p-2"
          >
            Add to Cart
          </button>
        </div>
      ))}
    </div>
  );
};

export default Products;