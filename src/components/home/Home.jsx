import { Link } from "react-router-dom";
import { suits, shirts, shoes, newArrivals } from "../../data/products";
import ProductCard from "../product/ProductCard";
import "./Home.css";

const categories = [
  { label: "Suits", to: "/suits", desc: "Tailored excellence for every occasion" },
  { label: "Shirts", to: "/shirts", desc: "Crafted from the finest Egyptian cotton" },
  { label: "Shoes", to: "/shoes", desc: "Hand-finished leather, built to last" },
];

const Home = ({ onAddToCart }) => {
  return (
    <main className="home">
      {/* Hero */}
      <section className="hero">
        <div className="hero-content">
          <p className="hero-eyebrow">Luxury Men's Fashion</p>
          <h1>
            Dress Like <br />
            <span>Royalty</span>
          </h1>
          <p className="hero-sub">
            Curated suits, shirts and shoes for the discerning gentleman.
          </p>
          <div className="hero-actions">
            <Link to="/new-arrivals" className="btn btn-gold">New Arrivals</Link>
            <Link to="/suits" className="btn btn-outline">Shop Suits</Link>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="section">
        <p className="section-eyebrow">Collections</p>
        <h2 className="section-title">Shop by Category</h2>
        <div className="category-grid">
          {categories.map((cat) => (
            <Link key={cat.to} to={cat.to} className="category-card">
              <div className="category-placeholder" />
              <div className="category-info">
                <h3>{cat.label}</h3>
                <p>{cat.desc}</p>
                <span className="category-link">Shop Now →</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* New Arrivals */}
      <section className="section section-dark">
        <p className="section-eyebrow light">Just In</p>
        <h2 className="section-title light">New Arrivals</h2>
        <div className="product-grid">
          {newArrivals.slice(0, 4).map((p) => (
            <ProductCard key={p.id} product={p} onAddToCart={onAddToCart} dark />
          ))}
        </div>
        <Link to="/new-arrivals" className="btn btn-gold mt">View All</Link>
      </section>

      {/* Brand strip */}
      <section className="brand-strip">
        <p>"Elegance is not about being noticed — it's about being remembered."</p>
        <span>— Hadassah Royal Collections</span>
      </section>

      {/* Newsletter */}
      <section className="section newsletter-section">
        <h2 className="section-title">Stay in the Know</h2>
        <p className="newsletter-sub">Be the first to hear about new arrivals and exclusive offers.</p>
        <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
          <input type="email" placeholder="Your email address" aria-label="Email address" />
          <button type="submit" className="btn btn-gold">Subscribe</button>
        </form>
      </section>
    </main>
  );
};

export default Home;
