import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/footer";
import Home from "./pages/Home";
import './styles/global.css';
import About from "./pages/About";
import Returns from "./pages/ReturnPolicy";
import Disclaimer from "./pages/Disclaimer";
import Login from "./pages/LoginPage"
import Register from "./pages/Register";
import ProductDetail from "./pages/ProductDetail";
import Shop from "./pages/Shop";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";




function App() {
  return (
    <Router>

      <Navbar />
      <Routes>

         <Route path="/" element={<Home />} />
         <Route path="/about" element={<About />} />
         <Route path="/returns" element={<Returns />} />
          <Route path="/disclaimer" element={<Disclaimer />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />

          <Route path="/product/:id" element={<ProductDetail />} />
        

        </Routes>
        <Footer />
    </Router>
  );
}

export default App;

//3:48:49
