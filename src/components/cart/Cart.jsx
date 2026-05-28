import { Link } from "react-router-dom";
import { AiOutlineDelete } from "react-icons/ai";
import "./Cart.css";

const Cart = ({ cart, onRemove, onClear }) => {
  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  if (cart.length === 0) return (
    <main className="cart-empty">
      <h2>Your cart is empty.</h2>
      <p>Discover our collections and add something exceptional.</p>
      <Link to="/" className="btn btn-gold">Continue Shopping</Link>
    </main>
  );

  return (
    <main className="cart-page">
      <div className="cart-header">
        <h1>Your Cart</h1>
        <button className="cart-clear" onClick={onClear}>Clear all</button>
      </div>

      <div className="cart-layout">
        <div className="cart-items">
          {cart.map((item) => (
            <div key={item.id} className="cart-item">
              <div className="cart-item-image" />
              <div className="cart-item-info">
                <h4>{item.name}</h4>
                <p className="cart-item-category">{item.category}</p>
                <p className="cart-item-price">Ksh {item.price.toLocaleString()} × {item.qty}</p>
              </div>
              <button className="cart-remove" onClick={() => onRemove(item.id)} aria-label="Remove item">
                <AiOutlineDelete />
              </button>
            </div>
          ))}
        </div>

        <div className="cart-summary">
          <h3>Order Summary</h3>
          <div className="summary-row">
            <span>Subtotal</span>
            <span>Ksh {total.toLocaleString()}</span>
          </div>
          <div className="summary-row">
            <span>Shipping</span>
            <span>Free</span>
          </div>
          <div className="summary-row total">
            <span>Total</span>
            <span>Ksh {total.toLocaleString()}</span>
          </div>
          <button className="btn btn-gold full">Proceed to Checkout</button>
          <Link to="/" className="cart-continue">← Continue Shopping</Link>
        </div>
      </div>
    </main>
  );
};

export default Cart;
