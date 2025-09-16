import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';
import { FaTimes, FaArrowRight, FaTrash } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import './CartSidebar.css';

function CartSidebar() {
  const {
    cart,
    cartTotal,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeFromCart,
    showNotification
  } = useContext(AppContext);
  
  console.log('CartSidebar rendered, isCartOpen:', isCartOpen);

  const navigate = useNavigate();

  const closeCart = () => {
    console.log('Closing cart sidebar');
    setIsCartOpen(false);
    document.body.classList.remove('menu-open');
  };

  const proceedToCheckout = () => {
    closeCart();
    navigate('/checkout');
  };

  const handleRemoveFromCart = (itemId, itemName) => {
    removeFromCart(itemId);
    showNotification({
      title: `${itemName} removed`,
      message: "Item removed from your cart",
      type: "info"
    });
  };

  const handleUpdateQuantity = (itemId, change) => {
    updateQuantity(itemId, change);
  };

  return (
    <>
      <AnimatePresence>
        {isCartOpen && (
          <>
            <motion.div 
              className="cart-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeCart}
            />
            
            <motion.div 
              className="cart-sidebar"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            >
              <div className="cart-header">
                <h2>Your Coffee Cart ({cart.length})</h2>
                <button className="close-cart" onClick={closeCart} aria-label="Close cart">
                  <FaTimes />
                </button>
              </div>
              
              <div className="cart-items">
                {cart.length === 0 ? (
                  <motion.div 
                    className="cart-empty"
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="empty-cart-icon">☕</div>
                    <p>Your cart is empty</p>
                    <p className="empty-cart-subtitle">Add some delicious coffee to get started!</p>
                    <button 
                      className="btn primary" 
                      onClick={closeCart}
                    >
                      Browse Coffees
                    </button>
                  </motion.div>
                ) : (
                  <motion.div 
                    className="cart-items-container"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.2 }}
                  >
                    {cart.map((item, index) => (
                      <motion.div 
                        className="cart-item"
                        key={`${item.id}-${index}`}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05, duration: 0.3 }}
                        exit={{ opacity: 0, x: 20 }}
                      >
                        <div className="cart-item-image">
                          <img src={item.image} alt={item.name} loading="lazy" />
                          {item.badge && (
                            <span className="item-badge">{item.badge}</span>
                          )}
                        </div>
                        <div className="cart-item-details">
                          <div className="cart-item-title">{item.name}</div>
                          <div className="cart-item-meta">
                            <span className="cart-item-roast">{item.roast} Roast</span>
                            <span className="cart-item-size">{item.size}</span>
                          </div>
                          <div className="cart-item-price">KSh {item.price.toLocaleString()} × {item.quantity}</div>
                          <div className="cart-item-subtotal">
                            Subtotal: KSh {(item.price * item.quantity).toLocaleString()}
                          </div>
                          <div className="cart-item-controls">
                            <div className="quantity-control">
                              <button 
                                onClick={() => handleUpdateQuantity(item.id, -1)}
                                disabled={item.quantity <= 1}
                                aria-label="Decrease quantity"
                              >
                                -
                              </button>
                              <span className="quantity-display">{item.quantity}</span>
                              <button 
                                onClick={() => handleUpdateQuantity(item.id, 1)}
                                aria-label="Increase quantity"
                              >
                                +
                              </button>
                            </div>
                            <button 
                              className="remove-item" 
                              onClick={() => handleRemoveFromCart(item.id, item.name)}
                              aria-label="Remove item"
                            >
                              <FaTrash />
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </div>
              
              {cart.length > 0 && (
                <motion.div 
                  className="cart-footer"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.3 }}
                >
                  <div className="cart-summary">
                    <div className="cart-total">
                      <span>Subtotal:</span>
                      <span>KSh {cartTotal.toLocaleString()}</span>
                    </div>
                    <div className="cart-shipping">
                      <span>Shipping:</span>
                      <span>Calculated at checkout</span>
                    </div>
                    <div className="cart-grand-total">
                      <span>Total:</span>
                      <span>KSh {cartTotal.toLocaleString()}</span>
                    </div>
                  </div>
                  
                  <motion.button 
                    className="btn btn-primary checkout-btn" 
                    onClick={proceedToCheckout}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    aria-label="Proceed to checkout"
                  >
                    Proceed to Checkout <FaArrowRight />
                  </motion.button>
                  
                  <button 
                    className="continue-shopping"
                    onClick={closeCart}
                  >
                    Continue Shopping
                  </button>
                </motion.div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

export default CartSidebar; 