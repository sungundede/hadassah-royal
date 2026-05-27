import { shoes } from "../../data/products";
import ProductCard from "../product/ProductCard";
import "../suits/Category.css";

const Shoes = ({ onAddToCart }) => (
  <main className="category-page">
    <div className="category-hero">
      <p className="section-eyebrow">Collection</p>
      <h1>Shoes</h1>
      <p>Hand-finished leather, built to last a lifetime. Every pair tells a story.</p>
    </div>
    <div className="category-products">
      {shoes.map((p) => (
        <ProductCard key={p.id} product={p} onAddToCart={onAddToCart} />
      ))}
    </div>
  </main>
);

export default Shoes;
