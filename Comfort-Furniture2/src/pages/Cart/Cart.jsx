import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../../context/CartContext';
import Button from '../../components/Button/Button';
import './Cart.css';

export default function Cart() {
  const { items, removeItem, updateQuantity, totalPrice } = useCart();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (items.length === 0) {
    return (
      <div className="cart-page">
        <div className="container">
          <div className="cart-header">
            <h1>Your Cart</h1>
          </div>
          <div className="cart-empty">
            <h2>Your cart is empty</h2>
            <p>Looks like you haven't added anything yet.</p>
            <Button to="/shop" variant="solid" size="lg">Continue Shopping</Button>
          </div>
        </div>
      </div>
    );
  }

  const tax = totalPrice * 0.05; // 5% simulated tax
  const shipping = 150; // Flat rate shipping
  const finalTotal = totalPrice + tax + shipping;

  return (
    <div className="cart-page">
      <div className="container">
        <div className="cart-header">
          <h1>Your Cart</h1>
        </div>

        <div className="cart-layout">
          {/* Cart Items */}
          <div className="cart-items">
            <AnimatePresence>
              {items.map((item, index) => (
                <motion.div
                  key={`${item.id}-${item.woodFinish}-${item.legFinish}-${index}`}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95, height: 0, overflow: 'hidden', padding: 0, margin: 0 }}
                  transition={{ duration: 0.3 }}
                  className="cart-item"
                >
                  <div className="cart-item-image">
                    <img src={item.images[0]} alt={item.name} />
                  </div>
                  <div className="cart-item-details">
                    <h3 className="cart-item-title">{item.name}</h3>
                    <div className="cart-item-options">
                      <span>Wood: {item.woodFinish.replace('-', ' ')}</span>
                      <span>Legs: {item.legFinish.replace('-', ' ')}</span>
                    </div>
                    <div className="cart-item-price">${item.finalPrice.toLocaleString()}</div>
                    
                    <div className="cart-item-controls">
                      <div className="quantity-control">
                        <button 
                          className="quantity-btn"
                          onClick={() => updateQuantity(index, item.quantity - 1)}
                          aria-label="Decrease quantity"
                        >
                          −
                        </button>
                        <span className="quantity-value">{item.quantity}</span>
                        <button 
                          className="quantity-btn"
                          onClick={() => updateQuantity(index, item.quantity + 1)}
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>
                      <button 
                        className="remove-btn"
                        onClick={() => removeItem(index)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Order Summary */}
          <div className="order-summary">
            <h2>Order Summary</h2>
            <div className="summary-row">
              <span>Subtotal</span>
              <span>${totalPrice.toLocaleString()}</span>
            </div>
            <div className="summary-row">
              <span>Shipping</span>
              <span>${shipping.toLocaleString()}</span>
            </div>
            <div className="summary-row">
              <span>Tax (Estimated)</span>
              <span>${tax.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
            </div>
            
            <div className="summary-total">
              <span>Total</span>
              <span>${finalTotal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
            </div>

            <Button variant="solid" size="lg" full onClick={() => alert('Checkout flow not implemented yet.')}>
              Proceed to Checkout
            </Button>
            
            <div style={{ textAlign: 'center', marginTop: 'var(--space-4)' }}>
              <Button to="/shop" variant="ghost" size="sm">Continue Shopping</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
