import React, { useContext, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { clearCart } from '../redux/cartSlice';
import '../styles/cart.css';

const Checkout = () => {
  const { user } = useContext(AuthContext);
  const cartItems = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form, setForm] = useState({ fullName: user?.name || '', street: '', city: '', postalCode: '', country: '' });
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const total = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);

  if (!cartItems.length) return <main className="cart-page empty-cart"><h1>Your cart is empty</h1><Link className="btn" to="/shop">Shop products</Link></main>;
  if (!user) return <main className="cart-page empty-cart"><h1>Sign in to checkout</h1><p>Please log in before placing your order.</p><Link className="btn" to="/login">Log in</Link></main>;

  const submitOrder = async (event) => {
    event.preventDefault(); setError(''); setSubmitting(true);
    try {
      const response = await fetch('/api/orders', {
        method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${user.token}` },
        body: JSON.stringify({ items: cartItems.map(({ productId, qty, price }) => ({ productId, qty, price })), totalAmount: total, address: form, paymentId: `demo_${Date.now()}` }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Could not place order');
      dispatch(clearCart()); navigate('/');
    } catch (requestError) { setError(requestError.message); } finally { setSubmitting(false); }
  };

  return <main className="cart-page checkout-page"><form className="checkout-form" onSubmit={submitOrder}><p className="cart-kicker">Checkout</p><h1>Delivery details</h1>{error && <p className="checkout-error">{error}</p>}{Object.entries({ fullName: 'Full name', street: 'Street address', city: 'City', postalCode: 'Postal code', country: 'Country' }).map(([key, label]) => <label key={key}>{label}<input required value={form[key]} onChange={(event) => setForm({ ...form, [key]: event.target.value })} /></label>)}<button className="btn" disabled={submitting}>{submitting ? 'Placing order...' : `Place order · ₹${total.toLocaleString('en-IN')}`}</button></form><aside className="cart-summary"><h2>Order summary</h2>{cartItems.map((item) => <div key={item.productId}><span>{item.name} × {item.qty}</span><strong>₹{(item.price * item.qty).toLocaleString('en-IN')}</strong></div>)}<div className="summary-total"><span>Total</span><strong>₹{total.toLocaleString('en-IN')}</strong></div></aside></main>;
};

export default Checkout;
