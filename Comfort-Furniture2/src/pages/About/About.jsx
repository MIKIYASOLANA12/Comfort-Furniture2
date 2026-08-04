import { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import './About.css';

const processSteps = [
  { id: 1, title: 'Design', icon: '✏️', text: 'Every piece begins as a conversation. We discuss your needs, space, and aesthetic preferences.' },
  { id: 2, title: 'Wood Selection', icon: '🌳', text: 'We source sustainable, high-character wood. No two slabs are identical.' },
  { id: 3, title: 'Crafting', icon: '🪚', text: 'Traditional joinery meets modern precision in our Addis Ababa workshop.' },
  { id: 4, title: 'Finishing', icon: '🖌️', text: 'Hand-applied natural oils and hard-wax finishes protect and enhance the wood grain.' },
  { id: 5, title: 'Delivery', icon: '🚚', text: 'White-glove delivery straight to your home or office, fully assembled.' }
];

export default function About() {
  const scrollRef = useRef(null);
  const { scrollXProgress } = useScroll({ container: scrollRef });
  const scaleX = useTransform(scrollXProgress, [0, 1], [0, 1]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="about-page">
      <section className="about-hero">
        <div className="about-hero-bg">
          <img src="/images/Furniture15.jpg" alt="Workshop tools" />
        </div>
        <div className="about-hero-overlay" />
        <div className="about-hero-content">
          <motion.h1 
            className="about-hero-title"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Crafted with Intention
          </motion.h1>
          <motion.p 
            className="about-hero-subtitle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            We believe furniture shouldn't just fill a space. It should anchor it.
          </motion.p>
        </div>
      </section>

      <section className="process-section">
        <div className="container">
          <div className="process-header">
            <span className="section-label">Our Process</span>
            <h2>From Forest to Floor</h2>
          </div>
        </div>
        
        <div className="process-timeline" ref={scrollRef}>
          <div className="process-line" />
          <motion.div className="process-line-active" style={{ scaleX }} />
          
          {processSteps.map((step, i) => (
            <motion.div 
              key={step.id} 
              className="process-step"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="process-step-icon">{step.icon}</div>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="founder-section">
        <div className="container">
          <div className="founder-grid">
            <motion.div 
              className="founder-image"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <img src="/images/Furniture16.jpg" alt="Founder in workshop" />
            </motion.div>
            <motion.div 
              className="founder-content"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2>The Story</h2>
              <p>
                Comfort Furniture started in a small garage with a single goal: build a desk that lasts a lifetime. 
                Today, our workshop has grown, but our philosophy remains the same.
              </p>
              <p>
                We don't do mass production. We don't use particle board. We build every piece as if it were going into our own homes. 
                Because when you work at a desk every day, or gather your family around a dining table, the quality of that piece matters.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
