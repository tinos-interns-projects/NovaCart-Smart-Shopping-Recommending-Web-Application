import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Cart.css";
import productsData from "../productsData";

export default function Cart({ cart, setCart, user }) {
  const navigate = useNavigate();

  const [recommendations, setRecommendations] = useState([]);
  const [loadingRecs, setLoadingRecs] = useState(false);

  // Calculate total
  const total = cart.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);

  // Get recommendations based on cart items from API
  useEffect(() => {
    if (cart.length === 0) {
      setRecommendations([]);
      return;
    }

    // Try to get recommendations from API first
    const fetchRecommendations = async () => {
      setLoadingRecs(true);
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/recommender/cart/${user || 'anonymous'}/`);
        const data = await response.json();
        if (data.recommendations && data.recommendations.length > 0) {
          setRecommendations(data.recommendations.slice(0, 6));
        } else {
          // Fallback to local filtering if API doesn't return results
          filterLocally();
        }
      } catch (error) {
        console.log('API failed, using local filtering');
        filterLocally();
      }
      setLoadingRecs(false);
    };

    // Local fallback filtering using cart item categories
    const filterLocally = () => {
      // Get unique aisle_ids and department_ids from cart items
      const cartAisles = new Set();
      const cartDepartments = new Set();
      const cartProductIds = new Set(cart.map(item => item.id || item.product_id));

      cart.forEach(item => {
        if (item.aisle_id) cartAisles.add(item.aisle_id);
        if (item.department_id) cartDepartments.add(item.department_id);
      });

      // STEP 1: Get products from SAME AISLE first (highest priority)
      const sameAisleProducts = productsData.filter(product => {
        if (cartProductIds.has(product.id)) return false;
        return cartAisles.has(product.aisle_id);
      });

      // STEP 2: If not enough from same aisle, get from SAME DEPARTMENT
      let relatedProducts;
      if (sameAisleProducts.length >= 6) {
        relatedProducts = sameAisleProducts.slice(0, 6);
      } else {
        // Get already used aisle IDs to avoid duplicates
        const usedAisleIds = new Set(sameAisleProducts.map(p => p.aisle_id));
        
        const sameDepartmentProducts = productsData.filter(product => {
          if (cartProductIds.has(product.id)) return false;
          if (usedAisleIds.has(product.aisle_id)) return false; // Already in same aisle
          return cartDepartments.has(product.department_id);
        });
        
        // Combine: same aisle first, then same department
        relatedProducts = [...sameAisleProducts, ...sameDepartmentProducts].slice(0, 6);
      }

      setRecommendations(relatedProducts);
    };

    if (user) {
      fetchRecommendations();
    } else {
      // If not logged in, use local filtering
      filterLocally();
    }
  }, [cart, user]);

  // Add item to cart (for recommendation items)
  const addToCart = (product) => {
    // If not logged in, redirect to login
    if (!user) {
      navigate("/login");
      return;
    }
    
    const productId = product.product_id || product.id;
    const productName = product.product_name || product.name;
    
    // Always update local cart first
    const existingItem = cart.find(item => (item.id || item.product_id) === productId);
    if (existingItem) {
      setCart(cart.map(item => 
        ((item.id || item.product_id) === productId) 
          ? { ...item, quantity: (item.quantity || 1) + 1 }
          : item
      ));
    } else {
      setCart([...cart, { 
        id: productId, 
        product_id: productId,
        name: productName, 
        product_name: productName,
        price: product.price, 
        image: product.image || "",
        aisle_id: product.aisle_id || 1,
        department_id: product.department_id || 1,
        quantity: 1 
      }]);
    }
    
    // Also save to API if user is logged in
    if (user) {
      fetch("http://127.0.0.1:8000/api/cart/add/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: user,
          product_id: productId,
          product_name: productName,
          price: product.price,
          image: product.image || "",
          quantity: 1
        })
      }).catch(() => {
        // Ignore API errors - cart still works locally
      });
    }
  };

  // Remove item from cart
  const removeFromCart = (productId) => {
    // Always update local cart first
    setCart(cart.filter(item => item.id !== productId));
    
    // Also remove from API if user is logged in
    if (user) {
      fetch("http://127.0.0.1:8000/api/cart/remove/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: user,
          product_id: productId
        })
      }).catch(() => {
        // Ignore API errors - cart still works locally
      });
    }
  };

  return (

    <div className="cart">

      <h2>Shopping Cart</h2>

      {cart.length === 0 && <p>Your cart is empty</p>}

      {cart.map((item, index) => (

        <div className="cartItem" key={index}>

          <img src={item.image || "https://via.placeholder.com/150x150?text=No+Image"} alt={item.name} />

          <div className="cartItemDetails">
            <p className="cartItemName">{item.name}</p>
            <p className="cartItemPrice">₹ {item.price}</p>
            <div className="cartItemActions">
              <span>Qty: {item.quantity || 1}</span>
              <button 
                className="removeBtn"
                onClick={() => removeFromCart(item.id)}
              >
                Remove
              </button>
            </div>
          </div>

        </div>

      ))}

      <h3 className="cartTotal">Total: ₹ {total}</h3>

      {/* Related Products Recommendations */}
      {recommendations.length > 0 && (
        <div className="recommendations">
          <h3>You might also like</h3>
          <p className="recSubtitle">Based on your cart items</p>
          
          <div className="recGrid">
            {recommendations.map(product => {
              const prodId = product.product_id || product.id;
              const prodName = product.product_name || product.name;
              const prodImage = product.image || "https://via.placeholder.com/150x150?text=No+Image";
              return (
                <div key={prodId} className="recCard">
                  <img src={prodImage} alt={prodName} />
                  <p className="recName">{prodName}</p>
                  <p className="recPrice">₹ {product.price}</p>
                  <button 
                    className="addToCartBtn"
                    onClick={() => addToCart(product)}
                  >
                    Add to Cart
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}

    </div>

  );
}
