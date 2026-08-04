import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Button from '../../components/Button/Button';
import './Contact.css';

export default function Contact() {
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setFormState({ name: '', email: '', message: '' });
      setTimeout(() => setIsSuccess(false), 5000);
    }, 1500);
  };

  return (
    <div className="contact-page">
      <div className="container">
        <div className="contact-header">
          <h1>Get in Touch</h1>
          <p>Visit our showroom, request a custom quote, or just say hello.</p>
        </div>

        <div className="contact-layout">
          {/* Form */}
          <motion.div 
            className="contact-form-container"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2>Send us a message</h2>
            {isSuccess ? (
              <div className="form-success">
                <h3>Message Sent!</h3>
                <p>We'll get back to you within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <input 
                    type="text" 
                    id="name"
                    className="floating-input" 
                    placeholder=" "
                    required
                    value={formState.name}
                    onChange={e => setFormState({...formState, name: e.target.value})}
                  />
                  <label htmlFor="name" className="floating-label">Your Name</label>
                </div>
                
                <div className="form-group">
                  <input 
                    type="email" 
                    id="email"
                    className="floating-input" 
                    placeholder=" "
                    required
                    value={formState.email}
                    onChange={e => setFormState({...formState, email: e.target.value})}
                  />
                  <label htmlFor="email" className="floating-label">Email Address</label>
                </div>
                
                <div className="form-group">
                  <textarea 
                    id="message"
                    className="floating-input floating-textarea" 
                    placeholder=" "
                    required
                    value={formState.message}
                    onChange={e => setFormState({...formState, message: e.target.value})}
                  />
                  <label htmlFor="message" className="floating-label">How can we help?</label>
                </div>

                <Button type="submit" variant="solid" size="lg" full disabled={isSubmitting}>
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </Button>
              </form>
            )}
          </motion.div>

          {/* Info */}
          <motion.div 
            className="contact-info"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="info-block">
              <h3>Showroom & Workshop</h3>
              <p>Bole Road, Next to Millennium Hall<br/>Addis Ababa, Ethiopia</p>
            </div>
            
            <div className="info-block">
              <h3>Opening Hours</h3>
              <p>Monday - Friday: 9:00 AM - 6:00 PM<br/>Saturday: 10:00 AM - 4:00 PM<br/>Sunday: Closed</p>
            </div>
            
            <div className="info-block">
              <h3>Contact Details</h3>
              <p>Email: hello@comfortfurniture.com<br/>Phone: +251 911 234 567</p>
            </div>

            {/* Simulated Map Container */}
            <div className="map-container">
              <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#e5e3df', color: '#666' }}>
                [ Interactive Map Placeholder ]
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Floating Chat Bubble */}
      <a href="#" className="chat-bubble" aria-label="Chat on WhatsApp" title="Chat with us">
        <svg width="30" height="30" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 00-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
        </svg>
      </a>
    </div>
  );
}
