import { useState, useEffect } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import ProductList from './components/ProductList';
import CartModal from './components/CartModal';


function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] =useState([]);
  const [isCartModalOpen, setIsCartModalOpen] = useState(false);

  useEffect( () => {
    fetch('https://fakestoreapi.com/products')
      .then((res) => res.json())
      .then((data) => setProducts(data));
  },[]);

  const addToCart = (product) => {
    if (cart.some((item) => item.id === product.id)) {
      alert("Item already added to the cart");
    } else {
      setCart([...cart, product]);
    }
  };
  const removeFromCart = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  return (
    <div>
      <Navbar cartCount={cart.length} openCart={()=> setIsCartModalOpen(true)}/>
      <ProductList products={products} addToCart={addToCart}/>
      {isCartModalOpen && (
        <CartModal cart={cart} removeFromCart={removeFromCart} closeCart={()=>setIsCartModalOpen(false)}/>
      )
      }
    </div>
  )
}

export default App
