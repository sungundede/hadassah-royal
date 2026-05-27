import { newArrivals } from "../../data/products";
import ProductCard from "../product/ProductCard";
import "../suits/Category.css";

const Newarrivals = ({ onAddToCart }) => (
  <main className="category-page">
    <div className="category-hero">
      <p className="section-eyebrow">Just In</p>
      <h1>New Arrivals</h1>
      <p>The latest additions to the Hadassah Royal Collections — be the first to wear them.</p>
    </div>
    <div className="category-products">
      {newArrivals.map((p) => (
        <ProductCard key={p.id} product={p} onAddToCart={onAddToCart} />
      ))}
    </div>
  </main>
);

export default Newarrivals;
