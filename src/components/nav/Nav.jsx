import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import {
  AiOutlineClose,
  AiOutlineShoppingCart,
  AiOutlineSearch,
  AiOutlineUser,
  AiOutlineLogout,
  AiOutlineIdcard,
  AiOutlineInbox,
} from "react-icons/ai";
import { useAuth } from "../../contexts/AuthContext";
import "./Nav.css";

const links = [
  { label: "Suits", to: "/suits" },
  { label: "Shirts", to: "/shirts" },
  { label: "Shoes", to: "/shoes" },
  { label: "New Arrivals", to: "/new-arrivals" },
  { label: "About", to: "/about" },
];

const Nav = ({ cartCount = 0 }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  const handleLogout = () => {
    setAccountOpen(false);
    logout();
    navigate("/");
  };

  const closeAccount = () => setAccountOpen(false);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setAccountOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="nav">
      <Link to="/" className="nav-brand">
        <img src="/fav.jpg" alt="Hadassah Royal" className="nav-logo" />
      </Link>

      <div className={menuOpen ? "nav-links open" : "nav-links"}>
        {links.map((l) => (
          <NavLink
            key={l.to}
            to={l.to}
            className={({ isActive }) =>
              `nav-link${isActive ? " active" : ""}${l.label === "New Arrivals" ? " nav-link-special" : ""}`
            }
            onClick={() => setMenuOpen(false)}
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

        {/* ── account icon + dropdown ── */}
        <div className="account-menu" ref={dropdownRef}>
          <button
            type="button"
            className={`nav-icon account-trigger${accountOpen ? " active" : ""}${user ? " logged-in" : ""}`}
            onClick={() => setAccountOpen((prev) => !prev)}
            aria-label="Account menu"
            aria-expanded={accountOpen}
          >
            <AiOutlineUser />
            {user && <span className="account-dot" />}
          </button>

          {accountOpen && (
            <div className="account-dropdown">
              {user ? (
                <>
                  <div className="dropdown-header">
                    <span className="dropdown-label">Signed in as</span>
                    <span className="dropdown-email">{user.email}</span>
                  </div>
                  <div className="dropdown-divider" />
                  <Link to="/account" className="dropdown-item" onClick={closeAccount}>
                    <AiOutlineIdcard className="dropdown-icon" />
                    My Account
                  </Link>
                  <Link to="/deliveries" className="dropdown-item" onClick={closeAccount}>
                    <AiOutlineInbox className="dropdown-icon" />
                    My Deliveries
                  </Link>
                  <div className="dropdown-divider" />
                  <button type="button" className="dropdown-item danger" onClick={handleLogout}>
                    <AiOutlineLogout className="dropdown-icon" />
                    Sign Out
                  </button>
                </>
              ) : (
                <>
                  <div className="dropdown-header">
                    <span className="dropdown-label">Welcome</span>
                    <span className="dropdown-email">Sign in to your account</span>
                  </div>
                  <div className="dropdown-divider" />
                  <Link to="/login" className="dropdown-item" onClick={closeAccount}>
                    <AiOutlineUser className="dropdown-icon" />
                    Sign In
                  </Link>
                  <Link to="/register" className="dropdown-item" onClick={closeAccount}>
                    <AiOutlineIdcard className="dropdown-icon" />
                    Create Account
                  </Link>
                </>
              )}
            </div>
          )}
        </div>

        <button
          className="nav-burger"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <AiOutlineClose /> : <GiHamburgerMenu />}
        </button>
      </div>
    </nav>
  );
};

export default Nav;
