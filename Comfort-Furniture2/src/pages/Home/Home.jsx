import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../../components/Button/Button';
import ProductCard from '../../components/ProductCard/ProductCard';
import { products, categories, testimonials, galleryImages } from '../../data/products';
import './Home.css';

const heroWords = ['Furniture', 'Made', 'for', 'the', 'Way', 'You', 'Live.'];

export default function Home() {
  const [showScroll, setShowScroll] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) setShowScroll(false);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const featuredProducts = products.slice(0, 3);

  return (
    <div className="home-page">
      {/* ===== HERO ===== */}
      <section className="home-hero">
        <div className="home-hero-bg">
          <video src="/videos/Furniture1.mp4" autoPlay loop muted playsInline className="hero-video" />
        </div>
        <div className="home-hero-overlay" />

        <div className="home-hero-content">
          <h1 className="home-hero-title">
            {heroWords.map((word, i) => (
              <motion.span
                key={i}
                className="word"
                initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{
                  duration: 0.6,
                  delay: 0.3 + i * 0.06,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                {word}
              </motion.span>
            ))}
          </h1>

          <motion.p
            className="home-hero-subtitle"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
          >
            Handcrafted desks and tables, built to your exact vision. No compromises, no shortcuts — just wood, skill, and care.
          </motion.p>

          <motion.div
            className="home-hero-ctas"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.1 }}
          >
            <Button to="/shop" variant="solid" size="lg">Shop Tables</Button>
            <Button to="/design-studio" variant="ghost-white" size="lg">Design Your Own</Button>
          </motion.div>
        </div>

        <AnimatePresence>
          {showScroll && (
            <motion.div
              className="home-hero-scroll"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 1.5 }}
            >
              <span>Scroll</span>
              <span className="scroll-chevron">↓</span>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* ===== CATEGORIES ===== */}
      <section className="categories-section">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Browse by Category</span>
            <h2>Find Your Perfect Desk</h2>
          </div>
          <div className="categories-grid">
            {categories.map((cat, i) => (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <Link to={`/shop?category=${cat.slug}`} className="category-card">
                  <img src={cat.image} alt={cat.name} className="category-card-image" loading="lazy" />
                  <div className="category-card-overlay">
                    <span className="category-card-label">{cat.name}</span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FEATURED PRODUCTS ===== */}
      <section className="featured-section">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Handpicked</span>
            <h2>Featured Pieces</h2>
            <p>Our most loved designs, crafted to perfection.</p>
          </div>
          <div className="products-grid">
            {featuredProducts.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: 'var(--space-10)' }}>
            <Button to="/shop" variant="ghost">View All Products</Button>
          </div>
        </div>
      </section>

      {/* ===== GALLERY: SEE IT IN REAL SPACES ===== */}
      <section className="gallery-section">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Real Homes, Real Spaces</span>
            <h2>See It In Your World</h2>
            <p>Our furniture, living in the spaces of our customers.</p>
          </div>
          <div className="gallery-masonry">
            {galleryImages.map((img, i) => (
              <motion.div
                key={img.id}
                className="gallery-masonry-item"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
              >
                <img src={img.src} alt={img.alt} loading="lazy" />
                <div className="gallery-masonry-caption">{img.caption}</div>
              </motion.div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: 'var(--space-10)' }}>
            <Button to="/gallery" variant="ghost">Explore Full Gallery</Button>
          </div>
        </div>
      </section>

      {/* ===== CRAFTSMANSHIP TEASER ===== */}
      <section className="craft-section">
        <div className="container">
          <motion.div
            className="craft-grid"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="craft-image">
              <img src="/images/Furniture16.jpg" alt="Craftsmanship process" loading="lazy" />
            </div>
            <div className="craft-content">
              <span className="section-label">Our Process</span>
              <h2>Built by Hand. Finished with Heart.</h2>
              <p>
                Every piece begins as a conversation and a sketch. From wood selection to final finish, each step is done by hand in our Addis Ababa workshop. No factory lines, no shortcuts — just decades of craft meeting modern design.
              </p>
              <Button to="/about" variant="ghost">Learn Our Process</Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <section className="testimonials-section">
        <div className="container">
          <div className="section-header">
            <span className="section-label">What Our Customers Say</span>
            <h2>Trusted by Those Who Care</h2>
          </div>
          <div className="testimonials-carousel">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.id}
                className="testimonial-card"
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <div className="testimonial-stars">★★★★★</div>
                <p className="testimonial-text">"{t.text}"</p>
                <div className="testimonial-author">
                  <div className="testimonial-avatar">
                    <img src={t.image} alt={t.author} />
                  </div>
                  <div className="testimonial-author-info">
                    <h4>{t.author}</h4>
                    <span>{t.role}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CUSTOM CTA BANNER ===== */}
      <section className="cta-banner">
        <div className="container">
          <motion.div
            className="cta-banner-inner"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="cta-banner-content">
              <span className="cta-float-icon">✏️</span>
              <h2>Have a design in mind? Upload it. We'll build it.</h2>
              <p>
                Bring us a sketch, a Pinterest find, or just an idea. Our craftsmen will turn your vision into a real, handcrafted piece — built exactly to your specifications.
              </p>
              <Button to="/design-studio" variant="sage" size="lg">Start Your Custom Design</Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===== Floating FAB ===== */}
      <Link to="/design-studio" className="floating-fab" aria-label="Design Your Own" title="Design Your Own">
        ✎
      </Link>
    </div>
  );
}
