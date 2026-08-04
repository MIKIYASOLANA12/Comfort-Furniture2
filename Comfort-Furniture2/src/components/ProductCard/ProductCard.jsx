import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { finishes, categories } from '../../data/products';
import './ProductCard.css';

export default function ProductCard({ product, index = 0 }) {
  const category = categories.find(c => c.id === product.category);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
    >
      <Link to={`/product/${product.slug}`} className="product-card" style={{ display: 'block', textDecoration: 'none' }}>
        <div className="product-card-image">
          <img
            src={product.images[0]}
            alt={product.name}
            loading="lazy"
          />
          <span className="product-card-quick-view">Quick View</span>
        </div>
        <div className="product-card-info">
          <div className="product-card-category">
            {category?.name || product.category}
          </div>
          <h3 className="product-card-name">{product.name}</h3>
          <div className="product-card-bottom">
            <span className="product-card-price">${product.price.toLocaleString()}</span>
            <div className="product-card-finishes">
              {finishes.wood.slice(0, 4).map(f => (
                <span
                  key={f.id}
                  className="product-card-finish-dot"
                  style={{ backgroundColor: f.hex }}
                  title={f.name}
                />
              ))}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
