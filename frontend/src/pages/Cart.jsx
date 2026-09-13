import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromCart, updateQuantity } from '../redux/cartSlice';
import '../styles/cart.css';

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const subtotal = cartItems.reduce((total, item) => total + item.price * item.qty, 0);

  if (cartItems.length === 0) {
    return <main className="cart-page empty-cart"><h1>Your cart is empty</h1><p>Add products to your cart to see them here.</p><Link className="btn" to="/shop">Continue shopping</Link></main>;
  }

  return (
    <main className="cart-page">
      <div>
        <p className="cart-kicker">Shopping bag</p>
        <h1>Cart ({cartItems.length})</h1>
        <section className="cart-items">
          {cartItems.map((item) => (
            <article className="cart-item" key={item.productId}>
              <img src={item.image} alt={item.name} />
              <div className="cart-item-details">
                <h2>{item.name}</h2><p>₹{item.price.toLocaleString('en-IN')}</p>
                <div className="quantity-control" aria-label={`Quantity for ${item.name}`}>
                  <button onClick={() => dispatch(updateQuantity({ productId: item.productId, qty: item.qty - 1 }))} aria-label="Decrease quantity">−</button>
                  <span>{item.qty}</span>
                  <button onClick={() => dispatch(updateQuantity({ productId: item.productId, qty: item.qty + 1 }))} aria-label="Increase quantity">+</button>
                </div>
              </div>
              <div className="cart-item-total"><strong>₹{(item.price * item.qty).toLocaleString('en-IN')}</strong><button className="remove-button" onClick={() => dispatch(removeFromCart(item.productId))}>Remove</button></div>
            </article>
          ))}
        </section>
      </div>
      <aside className="cart-summary">
        <h2>Order summary</h2>
        <div><span>Subtotal</span><strong>₹{subtotal.toLocaleString('en-IN')}</strong></div>
        <div><span>Shipping</span><span>Calculated at checkout</span></div>
        <div className="summary-total"><span>Total</span><strong>₹{subtotal.toLocaleString('en-IN')}</strong></div>
        <button className="btn" onClick={() => navigate('/checkout')}>Proceed to checkout</button>
      </aside>
    </main>
  );
};

export default Cart;
