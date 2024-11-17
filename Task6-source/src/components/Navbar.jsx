import React from "react";
import { Link } from "react-router-dom";

const Navbar = ({ cartCount }) => (
  <nav className="bg-violet-500 p-4 flex justify-between items-center">
    <h1 className="text-white text-lg font-bold">My Store</h1>
    <div className="flex gap-4">
      <Link to="/" className="text-white">Products</Link>
      <Link to="/cart" className="text-white">
        Cart ({cartCount})
      </Link>
    </div>
  </nav>
);

export default Navbar;