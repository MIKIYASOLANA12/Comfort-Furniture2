import { useState, useMemo, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import ProductCard from '../../components/ProductCard/ProductCard';
import { products, categories, finishes } from '../../data/products';
import './Shop.css';

export default function Shop() {
  const location = useLocation();
  const navigate = useNavigate();
  
  // State
  const [activeCategory, setActiveCategory] = useState('all');
  const [activeSort, setActiveSort] = useState('featured');
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  
  // Parse URL query on load
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const categoryParam = params.get('category');
    if (categoryParam && categories.find(c => c.slug === categoryParam)) {
      setActiveCategory(categoryParam);
    }
    window.scrollTo(0, 0);
  }, [location]);

  // Derived filtered products
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Category
    if (activeCategory !== 'all') {
      result = result.filter(p => p.category === activeCategory);
    }

    // Sort
    if (activeSort === 'price-low') {
      result.sort((a, b) => a.price - b.price);
    } else if (activeSort === 'price-high') {
      result.sort((a, b) => b.price - a.price);
    } // 'featured' relies on default order

    return result;
  }, [activeCategory, activeSort]);

  const handleCategoryChange = (slug) => {
    setActiveCategory(slug);
    navigate(`/shop${slug !== 'all' ? `?category=${slug}` : ''}`, { replace: true });
  };

  const Sidebar = () => (
    <>
      <div className="filter-group">
        <h4 className="filter-title">Category</h4>
        <div className="filter-options">
          <label className="filter-checkbox">
            <input
              type="radio"
              name="category"
              checked={activeCategory === 'all'}
              onChange={() => handleCategoryChange('all')}
            />
            All Products
          </label>
          {categories.map(cat => (
            <label key={cat.id} className="filter-checkbox">
              <input
                type="radio"
                name="category"
                checked={activeCategory === cat.slug}
                onChange={() => handleCategoryChange(cat.slug)}
              />
              {cat.name}
            </label>
          ))}
        </div>
      </div>
    </>
  );

  return (
    <div className="shop-page">
      <div className="container-wide">
        <div className="shop-header">
          <h1>Our Collection</h1>
          <p>Explore our full range of handcrafted desks and tables. Every piece is built to order and designed to last a lifetime.</p>
        </div>

        <div className="shop-layout">
          {/* Desktop Sidebar */}
          <aside className="shop-sidebar">
            <Sidebar />
          </aside>

          {/* Main Content */}
          <div className="shop-main">
            <div className="shop-controls">
              <div className="shop-controls-top">
                <button 
                  className="mobile-filters-btn"
                  onClick={() => setMobileDrawerOpen(true)}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="4" y1="21" x2="4" y2="14"></line>
                    <line x1="4" y1="10" x2="4" y2="3"></line>
                    <line x1="12" y1="21" x2="12" y2="12"></line>
                    <line x1="12" y1="8" x2="12" y2="3"></line>
                    <line x1="20" y1="21" x2="20" y2="16"></line>
                    <line x1="20" y1="12" x2="20" y2="3"></line>
                    <line x1="1" y1="14" x2="7" y2="14"></line>
                    <line x1="9" y1="8" x2="15" y2="8"></line>
                    <line x1="17" y1="16" x2="23" y2="16"></line>
                  </svg>
                  Filters
                </button>
                <div className="shop-results-count">
                  Showing {filteredProducts.length} results
                </div>
              </div>
              <div className="shop-sort">
                <select value={activeSort} onChange={e => setActiveSort(e.target.value)}>
                  <option value="featured">Sort by: Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                </select>
              </div>
            </div>

            {filteredProducts.length > 0 ? (
              <div className="shop-grid">
                {filteredProducts.map((product, i) => (
                  <ProductCard key={product.id} product={product} index={i} />
                ))}
              </div>
            ) : (
              <div className="shop-empty">
                <h3>No products found</h3>
                <p>Try adjusting your filters.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filter Drawer */}
      <AnimatePresence>
        {mobileDrawerOpen && (
          <motion.div 
            className="mobile-filter-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div 
              className="mobile-filter-drawer"
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            >
              <div className="mobile-filter-header">
                <h3>Filters</h3>
                <button 
                  className="mobile-filter-close"
                  onClick={() => setMobileDrawerOpen(false)}
                >
                  ✕
                </button>
              </div>
              <Sidebar />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
