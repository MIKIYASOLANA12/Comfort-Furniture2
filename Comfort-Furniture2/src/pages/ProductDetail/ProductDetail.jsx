import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { products, finishes } from '../../data/products';
import { useCart } from '../../context/CartContext';
import { useToast } from '../../context/ToastContext';
import ColorPicker from '../../components/ColorPicker/ColorPicker';
import Button from '../../components/Button/Button';
import './ProductDetail.css';

const Accordion = ({ title, children, defaultOpen = false }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="pdp-accordion-item">
      <button 
        className="pdp-accordion-header" 
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <span>{title}</span>
        <span>{isOpen ? '−' : '+'}</span>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="pdp-accordion-content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="pdp-accordion-inner">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function ProductDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { addItem } = useCart();
  const { addToast } = useToast();
  
  const product = products.find(p => p.slug === slug);
  
  const [activeImage, setActiveImage] = useState(0);
  const [selectedWood, setSelectedWood] = useState(product?.defaultFinish?.wood || 'walnut');
  const [selectedLegs, setSelectedLegs] = useState(product?.defaultFinish?.legs || 'matte-black');
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!product) {
    return (
      <div className="container section text-center">
        <h2>Product Not Found</h2>
        <Button to="/shop" variant="solid" style={{ marginTop: 'var(--space-6)' }}>Return to Shop</Button>
      </div>
    );
  }

  // Calculate dynamic price
  const woodPrice = finishes.wood.find(f => f.id === selectedWood)?.price || 0;
  const legPrice = finishes.legs.find(f => f.id === selectedLegs)?.price || 0;
  const finalPrice = product.price + woodPrice + legPrice;

  const handleAddToCart = () => {
    addItem(product, selectedWood, selectedLegs, finalPrice);
    addToast('Added to cart', 'success');
  };

  const handleCustomize = () => {
    // In Phase 2, this will pass params to Design Studio
    navigate('/design-studio');
  };

  return (
    <div className="pdp-page">
      <div className="container">
        <div className="pdp-layout">
          {/* Gallery */}
          <div className="pdp-gallery">
            <AnimatePresence mode="wait">
              <motion.div 
                key={activeImage}
                className="pdp-main-image"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <img src={product.images[activeImage]} alt={`${product.name} view ${activeImage + 1}`} />
              </motion.div>
            </AnimatePresence>
            
            {product.images.length > 1 && (
              <div className="pdp-thumbnails">
                {product.images.map((img, i) => (
                  <button 
                    key={i}
                    className={`pdp-thumbnail ${activeImage === i ? 'active' : ''}`}
                    onClick={() => setActiveImage(i)}
                  >
                    <img src={img} alt={`Thumbnail ${i + 1}`} />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info Panel */}
          <div className="pdp-info">
            <div className="pdp-header">
              <h1>{product.name}</h1>
              <motion.div 
                className="pdp-price"
                key={finalPrice} // Trigger re-render animation when price changes
                initial={{ scale: 1.1, color: 'var(--color-amber)' }}
                animate={{ scale: 1, color: 'var(--color-walnut)' }}
                transition={{ duration: 0.3 }}
              >
                ${finalPrice.toLocaleString()}
              </motion.div>
            </div>

            <p className="pdp-description">{product.description}</p>

            <div className="pdp-options">
              <div className="pdp-option-group">
                <h3>Select Finishes</h3>
                <ColorPicker 
                  selectedWood={selectedWood}
                  selectedLegs={selectedLegs}
                  onWoodChange={setSelectedWood}
                  onLegsChange={setSelectedLegs}
                  showMixMatch={true}
                />
              </div>

              <div className="pdp-option-group">
                <h3>Dimensions (cm)</h3>
                <div className="pdp-dimensions-visual">
                  {/* Simplistic SVG visualizer for dimensions */}
                  <svg width="200" height="150" viewBox="0 0 200 150">
                    <rect x="20" y="20" width="160" height="8" fill="var(--color-amber)" rx="2" />
                    <rect x="30" y="28" width="8" height="100" fill="var(--color-charcoal)" rx="2" />
                    <rect x="162" y="28" width="8" height="100" fill="var(--color-charcoal)" rx="2" />
                    {/* Width label */}
                    <path d="M 20 10 L 180 10" stroke="var(--color-text)" strokeWidth="1" strokeDasharray="2,2" />
                    <text x="100" y="8" fontSize="10" fill="var(--color-text)" textAnchor="middle">{product.dimensions.width} W</text>
                    {/* Depth label */}
                    <text x="100" y="32" fontSize="10" fill="var(--color-text)" textAnchor="middle">{product.dimensions.depth} D</text>
                    {/* Height label */}
                    <path d="M 190 20 L 190 128" stroke="var(--color-text)" strokeWidth="1" strokeDasharray="2,2" />
                    <text x="195" y="74" fontSize="10" fill="var(--color-text)" transform="rotate(90, 195, 74)" textAnchor="middle">{product.dimensions.height} H</text>
                  </svg>
                </div>
                <p className="pdp-dimension-text">Need custom dimensions? Use the Design Studio.</p>
              </div>
            </div>

            <div className="pdp-actions">
              <Button onClick={handleAddToCart} variant="solid" size="lg" full>Add to Cart — ${finalPrice.toLocaleString()}</Button>
              <Button onClick={handleCustomize} variant="ghost" size="lg" full>Customize This Design</Button>
            </div>

            <ul className="pdp-features">
              {product.features.map((feature, i) => (
                <li key={i}>{feature}</li>
              ))}
            </ul>

            <div className="pdp-accordions">
              <Accordion title="Materials & Care" defaultOpen={true}>
                <p><strong>Materials:</strong> {product.materials}</p>
                <p style={{ marginTop: 'var(--space-2)' }}><strong>Care:</strong> Dust frequently with a clean, damp, lint-free cloth. Frequent dusting will remove abrasive build-up which can damage a finish over time.</p>
              </Accordion>
              <Accordion title="Shipping & Lead Time">
                <p><strong>Lead Time:</strong> {product.leadTime}. Every piece is built to order in our workshop.</p>
                <p style={{ marginTop: 'var(--space-2)' }}>White-glove delivery available. We assemble the piece in your room of choice and remove all packaging.</p>
              </Accordion>
              <Accordion title="Warranty">
                <p>Backed by our <strong>{product.warranty}</strong>. We stand by our craftsmanship. If structural integrity fails under normal use, we will repair or replace it.</p>
              </Accordion>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        {product.reviews && product.reviews.length > 0 && (
          <div className="pdp-reviews-section">
            <div className="section-header" style={{ marginBottom: 0 }}>
              <h2>Customer Reviews</h2>
            </div>
            <div className="pdp-reviews-list">
              {product.reviews.map(review => (
                <div key={review.id} className="pdp-review">
                  <div className="pdp-review-header">
                    <span className="pdp-review-stars">{'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}</span>
                    <span className="pdp-review-date">{new Date(review.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                  </div>
                  <p className="pdp-review-text">"{review.text}"</p>
                  <span className="pdp-review-author">— {review.author}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
