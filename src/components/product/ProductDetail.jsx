import { useParams, useNavigate } from "react-router-dom";
import { allProducts } from "../../data/products";
import "./ProductDetail.css";

const ProductDetail = ({ onAddToCart }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = allProducts.find((p) => p.id === Number(id));

  if (!product) return (
    <main className="not-found">
      <h2>Product not found.</h2>
      <button onClick={() => navigate(-1)} className="btn btn-gold">Go Back</button>
    </main>
  );

  const { name, price, tag, description, category } = product;

  return (
    <main className="product-detail">
      <div className="pd-image-wrap">
        <div className="pd-image" />
        {tag && <span className="product-tag">{tag}</span>}
      </div>
      <div className="pd-info">
        <p className="pd-category">{category}</p>
        <h1>{name}</h1>
        <p className="pd-price">${price}</p>
        <p className="pd-desc">{description}</p>
        <div className="pd-actions">
          <button className="btn btn-gold" onClick={() => onAddToCart(product)}>
            Add to Cart
          </button>
          <button className="btn btn-outline-dark" onClick={() => navigate(-1)}>
            Back
          </button>
        </div>
      </div>
    </main>
  );
};

export default ProductDetail;
