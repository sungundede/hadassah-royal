import { Link } from "react-router-dom";
import { AiOutlineInstagram, AiOutlineFacebook, AiOutlineTwitter } from "react-icons/ai";
import "./Footer.css";

const Footer = () => (
  <footer className="footer">
    <div className="footer-top">
      <div className="footer-brand">
        <h3>Hadassah <span>Royal</span></h3>
        <p>Luxury men's fashion curated for the discerning gentleman. Suits, shirts and shoes of uncompromising quality.</p>
        <div className="footer-socials">
          <a href="https://web.facebook.com/profile.php?id=100070617620093" target="_blank" rel="noreferrer" aria-label="Facebook"><AiOutlineFacebook /></a>
          <a href="#" aria-label="Instagram"><AiOutlineInstagram /></a>
          <a href="#" aria-label="Twitter"><AiOutlineTwitter /></a>
        </div>
      </div>

      <div className="footer-col">
        <h5>Collections</h5>
        <Link to="/suits">Suits</Link>
        <Link to="/shirts">Shirts</Link>
        <Link to="/shoes">Shoes</Link>
        <Link to="/new-arrivals">New Arrivals</Link>
      </div>

      <div className="footer-col">
        <h5>Company</h5>
        <Link to="/about">About Us</Link>
        <Link to="/contact">Contact</Link>
      </div>

      <div className="footer-col">
        <h5>Newsletter</h5>
        <p className="footer-newsletter-desc">Get exclusive offers and new arrival alerts.</p>
        <form className="footer-form" onSubmit={(e) => e.preventDefault()}>
          <input type="email" placeholder="Your email" aria-label="Email" />
          <button type="submit">Subscribe</button>
        </form>
      </div>
    </div>

    <div className="footer-bottom">
      <p>© {new Date().getFullYear()} Hadassah Royal Collections. All rights reserved.</p>
    </div>
  </footer>
);

export default Footer;
