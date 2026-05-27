import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Nav from "./components/nav/Nav";
import Home from "./components/home/Home";
import Suits from "./components/suits/Suits";
import Shirts from "./components/shirts/Shirts";
import Shoes from "./components/shoes/Shoes";
import Newarrivals from "./components/newarrivals/Newarrivals";
import ProductDetail from "./components/product/ProductDetail";
import Cart from "./components/cart/Cart";
import Footer from "./components/footer/Footer";
import "./index.css";

function App() {
  const [cart, setCart] = useState([]);

  const handleAddToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === product.id);
      if (existing) {
        return prev.map((i) => i.id === product.id ? { ...i, qty: i.qty + 1 } : i);
      }
      return [...prev, { ...product, qty: 1 }];
    });
  };

  const handleRemove = (id) => {
    setCart((prev) => prev.filter((i) => i.id !== id));
  };

  const cartCount = cart.reduce((sum, i) => sum + i.qty, 0);

  return (
    <Router>
      <Nav cartCount={cartCount} />
      <Routes>
        <Route path="/" element={<Home onAddToCart={handleAddToCart} />} />
        <Route path="/suits" element={<Suits onAddToCart={handleAddToCart} />} />
        <Route path="/shirts" element={<Shirts onAddToCart={handleAddToCart} />} />
        <Route path="/shoes" element={<Shoes onAddToCart={handleAddToCart} />} />
        <Route path="/new-arrivals" element={<Newarrivals onAddToCart={handleAddToCart} />} />
        <Route path="/product/:id" element={<ProductDetail onAddToCart={handleAddToCart} />} />
        <Route path="/cart" element={<Cart cart={cart} onRemove={handleRemove} onClear={() => setCart([])} />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
