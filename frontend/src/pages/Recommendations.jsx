import React, { useEffect, useState } from "react";
import "./Products.css";

export default function Recommendations() {
  const [recs, setRecs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  // Get username from localStorage
  const username = localStorage.getItem("user");

  useEffect(() => {
    if (!username) {
      setMessage("Please login to see your personalized recommendations.");
      setLoading(false);
      return;
    }

    // Fetch from the cart recommendations endpoint using username
    fetch(`http://127.0.0.1:8000/api/recommendations/cart/${username}/`)
      .then(res => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.json();
      })
      .then(data => {
        if (data.message) {
          setMessage(data.message);
        }
        if (data.recommendations) {
          setRecs(data.recommendations);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching recommendations:', err);
        setMessage("Failed to load recommendations. Please try again.");
        setLoading(false);
      });
  }, [username]);

  const handleAddToCart = (product) => {
    const username = localStorage.getItem("user");
    if (!username) {
      alert("Please login to add items to cart");
      return;
    }

    fetch("http://127.0.0.1:8000/api/cart/add/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: username,
        product_id: product.product_id,
        product_name: product.product_name,
        price: product.price,
        quantity: 1,
        image: product.image || ""
      })
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          alert("Product added to cart!");
          // Update local cart count
          const cart = JSON.parse(localStorage.getItem("cart") || "[]");
          cart.push({ ...product, quantity: 1 });
          localStorage.setItem("cart", JSON.stringify(cart));
          window.location.reload();
        } else {
          alert(data.message || "Failed to add to cart");
        }
      })
      .catch(err => {
        console.error("Error adding to cart:", err);
        alert("Failed to add to cart");
      });
  };

  if (loading) {
    return <div className="products-container"><p>Loading recommendations...</p></div>;
  }

  return (
    <div className="products-container">
      <h2>Recommended for You</h2>
      <p className="rec-subtitle">Based on your shopping preferences and cart items</p>
      
      {message && !recs.length && (
        <p className="no-recs">{message}</p>
      )}
      
      {recs.length === 0 ? (
        <p className="no-recs">
          {!username 
            ? "Please login to see your personalized recommendations!" 
            : "No recommendations yet. Start shopping to get personalized recommendations!"}
        </p>
      ) : (
        <div className="products-grid">
          {recs.map(product => (
            <div key={product.product_id} className="product-card">
              <img 
                src={product.image || "https://via.placeholder.com/200x200?text=No+Image"} 
                alt={product.product_name}
                className="product-image"
              />
              <h3>{product.product_name}</h3>
              <p className="product-info">Aisle: {product.aisle_id}</p>
              <p className="product-info">Department: {product.department_id}</p>
              {product.price && <p className="product-price">₹ {product.price}</p>}
              <button 
                className="add-to-cart-btn"
                onClick={() => handleAddToCart(product)}
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
