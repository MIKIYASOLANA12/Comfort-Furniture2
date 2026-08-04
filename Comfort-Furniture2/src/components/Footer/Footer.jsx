import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import './Footer.css';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <div className="footer-logo">Comfort<span>.</span></div>
            <p className="footer-description">
              Handcrafted furniture made to order. Every desk, every table — built with intention, finished with care.
            </p>
            <div className="footer-social">
              {['IG', 'FB', 'TW', 'PI'].map(platform => (
                <a key={platform} href="#" className="footer-social-link" aria-label={platform}>
                  {platform}
                </a>
              ))}
            </div>
          </div>

          <div className="footer-column">
            <h4>Shop</h4>
            <ul>
              <li><Link to="/shop">All Products</Link></li>
              <li><Link to="/shop?category=standing-desks">Standing Desks</Link></li>
              <li><Link to="/shop?category=executive-tables">Executive Tables</Link></li>
              <li><Link to="/shop?category=home-office">Home Office</Link></li>
              <li><Link to="/design-studio">Custom Design</Link></li>
            </ul>
          </div>

          <div className="footer-column">
            <h4>Company</h4>
            <ul>
              <li><Link to="/about">Our Story</Link></li>
              <li><Link to="/gallery">Gallery</Link></li>
              <li><Link to="/contact">Contact</Link></li>
              <li><a href="#">Shipping & Returns</a></li>
              <li><a href="#">Privacy Policy</a></li>
            </ul>
          </div>

          <div className="footer-column">
            <h4>Stay in Touch</h4>
            <p className="footer-newsletter-text" style={{ fontSize: 'var(--fs-sm)', marginBottom: 'var(--space-4)', color: 'rgba(255,255,255,0.7)' }}>
              New designs, workshop stories, and special offers. No spam, ever.
            </p>
            <form className="newsletter-form" onSubmit={handleSubmit}>
              <input
                type="email"
                className="newsletter-input"
                placeholder="Your email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
              <motion.button
                type="submit"
                className="newsletter-btn"
                whileTap={{ scale: 0.95 }}
              >
                {subscribed ? '✓ Subscribed!' : 'Subscribe'}
              </motion.button>
            </form>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Comfort Furniture. All rights reserved.</span>
          <span className="made-in">Made with care in <strong>Ethiopia</strong></span>
        </div>
      </div>
    </footer>
  );
}
