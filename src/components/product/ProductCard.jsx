import { Link } from "react-router-dom";
import "./ProductCard.css";

const ProductCard = ({ product, onAddToCart, dark = false }) => {
  const { id, name, price, tag, description } = product;

  return (
    <div className={`product-card ${dark ? "dark" : ""}`}>
      {tag && <span className="product-tag">{tag}</span>}
      <Link to={`/product/${id}`} className="product-image-link">
        <div className="product-image" />
      </Link>
      <div className="product-info">
        <Link to={`/product/${id}`}>
          <h4 className="product-name">{name}</h4>
        </Link>
        <p className="product-desc">{description}</p>
        <div className="product-footer">
          <span className="product-price">Ksh {price.toLocaleString()}</span>
          <button className="product-add" onClick={() => onAddToCart(product)}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
