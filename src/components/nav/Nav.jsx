import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineClose, AiOutlineShoppingCart, AiOutlineSearch } from "react-icons/ai"import { useAuth } from "../../contexts/AuthContext";
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
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="nav">
      <Link to="/" className="nav-brand">
        <img src="/fav.jpg" alt="Hadassah Royal" className="nav-logo" />
      </Link>

      <div className={open ? "nav-links open" : "nav-links"}>
        {links.map((l) => (
          <NavLink
            key={l.to}
            to={l.to}
            className={({ isActive }) =>
              `nav-link${isActive ? " active" : ""}${l.label === "New Arrivals" ? " nav-link-special" : ""}`
            }
            onClick={() => setOpen(false)}
          >
            {l.label}
          </NavLink>
        ))}
      </div>

      <div className="nav-actions">
        {user ? (
          <>
            <Link to="/deliveries" className="nav-link action-link">
              Deliveries
            </Link>
            <Link to="/account" className="nav-link action-link">
              Account
            </Link>
            <button type="button" className="nav-link action-link nav-logout" onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="nav-link action-link">
              Login
            </Link>
            <Link to="/register" className="nav-link action-link">
              Register
            </Link>
          </>
        )}

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
