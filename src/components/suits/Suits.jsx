import { suits } from "../../data/products";
import ProductCard from "../product/ProductCard";
import "./Category.css";

const Suits = ({ onAddToCart }) => (
  <main className="category-page">
    <div className="category-hero">
      <p className="section-eyebrow">Collection</p>
      <h1>Suits</h1>
      <p>Tailored excellence for every occasion — from boardroom to black tie.</p>
    </div>
    <div className="category-products">
      {suits.map((p) => (
        <ProductCard key={p.id} product={p} onAddToCart={onAddToCart} />
      ))}
    </div>
  </main>
);

export default Suits;
