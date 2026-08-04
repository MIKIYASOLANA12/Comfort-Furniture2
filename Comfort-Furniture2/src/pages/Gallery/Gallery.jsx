import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { galleryImages } from '../../data/products';
import './Gallery.css';

const allTags = Array.from(new Set(galleryImages.flatMap(img => img.tags)));

export default function Gallery() {
  const [activeTag, setActiveTag] = useState('All');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const filteredImages = useMemo(() => {
    if (activeTag === 'All') return galleryImages;
    return galleryImages.filter(img => img.tags.includes(activeTag));
  }, [activeTag]);

  return (
    <div className="gallery-page">
      <div className="container">
        <div className="gallery-header">
          <h1>Real Spaces</h1>
          <p>Explore how our custom pieces live and breathe in the homes and offices of our clients.</p>
        </div>

        <div className="gallery-filters">
          <button 
            className={`gallery-filter-btn ${activeTag === 'All' ? 'active' : ''}`}
            onClick={() => setActiveTag('All')}
          >
            All
          </button>
          {allTags.map(tag => (
            <button
              key={tag}
              className={`gallery-filter-btn ${activeTag === tag ? 'active' : ''}`}
              onClick={() => setActiveTag(tag)}
            >
              {tag}
            </button>
          ))}
        </div>

        <motion.div layout className="gallery-list">
          <AnimatePresence>
            {filteredImages.map((item, index) => (
              <motion.div
                layout
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                key={item.id}
                className="gallery-item"
              >
                <div className="gallery-item-image-wrapper">
                  <div className="gallery-item-image">
                    <img src={item.src} alt={item.alt} loading="lazy" />
                  </div>
                </div>
                <div className="gallery-item-content">
                  <div className="gallery-item-tags">
                    {item.tags.map(tag => (
                      <span key={tag} className="gallery-item-tag">{tag}</span>
                    ))}
                  </div>
                  <h3 className="gallery-item-caption">{item.caption}</h3>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}
