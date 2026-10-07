import React, { useEffect, useState } from 'react';
import ProductCart from '../components/ProductCart';
import '../styles/product.css';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('/api/products');
        const data = await res.json();
        setProducts(data.slice(0, 4)); // Featured products
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="home-container">
      <div className="hero-banner">
        <h1>Welcome to CARTIVO</h1>
        <p>Discover the best products at unbeatable prices.</p>
      </div>
      
      <div className="featured-section">
        <div className="featured-header">
          <div>
            <h2>Featured Products</h2>
            <p className="featured-subtitle">Curated selections just for you</p>
          </div>
          <div className="featured-badge">⭐ NEW</div>
        </div>
        
        {loading ? (
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>Loading amazing products...</p>
          </div>
        ) : (
          <div className="featured-product-grid">
            {products.map((product) => (
              <div key={product._id} className="featured-item">
                <ProductCart product={product} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
