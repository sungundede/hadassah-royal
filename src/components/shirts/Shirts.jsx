import { shirts } from "../../data/products";
import ProductCard from "../product/ProductCard";
import "../suits/Category.css";

const Shirts = ({ onAddToCart }) => (
  <main className="category-page">
    <div className="category-hero">
      <p className="section-eyebrow">Collection</p>
      <h1>Shirts</h1>
      <p>Crafted from the finest Egyptian cotton — impeccably finished for the modern gentleman.</p>
    </div>
    <div className="category-products">
      {shirts.map((p) => (
        <ProductCard key={p.id} product={p} onAddToCart={onAddToCart} />
      ))}
    </div>
  </main>
);

export default Shirts;
