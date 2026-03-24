import React, { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import FilterSidebar from "../components/FilterSidebar";
import "./Products.css";

export default function Products({ products, cart, setCart, user, searchTerm = "", pagination = {}, currentPage = 1, onPageChange }) {
  const navigate = useNavigate();
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  
  // Get price range from products
  const priceRange = useMemo(() => {
    if (products.length === 0) return { min: 0, max: 200000 };
    const prices = products.map((p) => p.price || p.price);
    return {
      min: Math.min(...prices),
      max: Math.max(...prices)
    };
  }, [products]);

  const [filters, setFilters] = useState({
    priceRange: { ...priceRange },
    minDiscount: 0,
    sortBy: "relevance",
  });

  // Update price range when products change
  useEffect(() => {
    setFilters(prev => ({
      ...prev,
      priceRange: { ...priceRange }
    }));
  }, [priceRange]);

  const addToCart = (product) => {
    // If not logged in, redirect to login
    if (!user) {
      navigate("/login");
      return;
    }
    
    const productId = product.id || product.product_id;
    const productName = product.name || product.product_name;
    
    // Always update local cart first for immediate feedback
    const existingItem = cart.find(item => item.id === productId);
    if (existingItem) {
      setCart(cart.map(item => 
        item.id === productId 
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
        quantity: 1,
        image: product.image || "",
        aisle_id: product.aisle_id || 1,
        department_id: product.department_id || 1
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

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Filter by search term
    if (searchTerm) {
      result = result.filter(p => 
        (p.name || p.product_name || "").toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by price range
    result = result.filter(p => 
      (p.price || 0) >= filters.priceRange.min && (p.price || 0) <= filters.priceRange.max
    );

    // Filter by discount
    if (filters.minDiscount > 0) {
      result = result.filter(p => 
        p.discount && p.discount >= filters.minDiscount
      );
    }

    // Sort products
    switch (filters.sortBy) {
      case "price-low":
        result.sort((a, b) => (a.price || 0) - (b.price || 0));
        break;
      case "price-high":
        result.sort((a, b) => (b.price || 0) - (a.price || 0));
        break;
      case "discount":
        result.sort((a, b) => (b.discount || 0) - (a.discount || 0));
        break;
      default:
        // relevance - keep original order
        break;
    }

    return result;
  }, [products, filters, searchTerm]);

  const handleFilterChange = () => {
    // Filter is handled by useMemo, this triggers re-render if needed
  };

  return (
    <div className="products-page">
      {/* Mobile Filter Toggle */}
      <button 
        className="mobile-filter-toggle"
        onClick={() => setShowMobileFilters(!showMobileFilters)}
      >
        <span>⚙️</span> Filters
      </button>

      <div className="products-layout">
        {/* Filter Sidebar */}
        <div className={`filter-container ${showMobileFilters ? 'show' : ''}`}>
          <FilterSidebar 
            products={products}
            filters={filters}
            setFilters={setFilters}
            onFilterChange={handleFilterChange}
          />
        </div>

        {/* Products Grid */}
        <div className="products-main">
          {/* Results Count */}
          <div className="results-header">
            <span className="results-count">
              {filteredProducts.length} products
              {searchTerm && ` for "${searchTerm}"`}
            </span>
          </div>

          {filteredProducts.length > 0 ? (
            <>
              <div className="products-grid">
                {filteredProducts.map((p) => (
                  <div className="product-card" key={p.id || p.product_id}>
                    <div className="product-image-container">
                      <img 
                        src={p.image || "https://via.placeholder.com/200x200?text=No+Image"} 
                        alt={p.name || p.product_name} 
                      />
                      {p.discount > 0 && (
                        <span className="product-discount">-{p.discount}%</span>
                      )}
                    </div>
                    
                    <div className="product-info">
                      <span className="product-category">{p.category || p.department || p.department_id || 'General'}</span>
                      <h3 className="product-name">{p.name || p.product_name}</h3>
                      
                      <div className="product-price-container">
                        <span className="product-price">₹ {(p.price || 0).toLocaleString()}</span>
                        {(p.originalPrice || p.original_price) && (
                          <span className="product-original-price">
                            ₹ {(p.originalPrice || p.original_price).toLocaleString()}
                          </span>
                        )}
                      </div>
                      
                      {p.discount > 0 && (
                        <span className="product-save">Save ₹ {((p.originalPrice || p.original_price) - p.price).toLocaleString()}</span>
                      )}
                    </div>

                    <button className="add-to-cart-btn" onClick={() => addToCart(p)}>
                      ADD TO CART
                    </button>
                  </div>
                ))}
              </div>
              
              {/* Pagination Controls */}
              {pagination.total_pages > 1 && (
                <div className="pagination">
                  <button 
                    className="pagination-btn"
                    onClick={() => onPageChange(currentPage - 1, searchTerm)}
                    disabled={currentPage <= 1}
                  >
                    ← Previous
                  </button>
                  
                  <span className="pagination-info">
                    Page {currentPage} of {pagination.total_pages}
                    {pagination.total_count && ` (${pagination.total_count} products)`}
                  </span>
                  
                  <button 
                    className="pagination-btn"
                    onClick={() => onPageChange(currentPage + 1, searchTerm)}
                    disabled={currentPage >= pagination.total_pages}
                  >
                    Next →
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="no-products">
              <div className="no-products-icon">🔍</div>
              <h3>No products found</h3>
              <p>Try adjusting your filters to see more results</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
