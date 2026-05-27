import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineClose, AiOutlineShoppingCart, AiOutlineSearch } from "react-icons/ai";
import "./Nav.css";

const links = [
  { label: "Suits", to: "/suits" },
  { label: "Shirts", to: "/shirts" },
  { label: "Shoes", to: "/shoes" },
  { label: "New Arrivals", to: "/new-arrivals" },
  { label: "About", to: "/about" },
];

const Nav = ({ cartCount = 0 }) => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="nav">
      <Link to="/" className="nav-brand">
        Hadassah <span>Royal</span>
      </Link>

      <div className={open ? "nav-links open" : "nav-links"}>
        {links.map((l) => (
          <NavLink
            key={l.to}
            to={l.to}
            className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
            onClick={() => setOpen(false)}
          >
            {l.label}
          </NavLink>
        ))}
      </div>

      <div className="nav-actions">
        <Link to="/search" className="nav-icon" aria-label="Search">
          <AiOutlineSearch />
        </Link>
        <Link to="/cart" className="nav-icon cart-icon" aria-label="Cart">
          <AiOutlineShoppingCart />
          {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
        </Link>
        <button
          className="nav-burger"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <AiOutlineClose /> : <GiHamburgerMenu />}
        </button>
      </div>
    </nav>
  );
};

export default Nav;
