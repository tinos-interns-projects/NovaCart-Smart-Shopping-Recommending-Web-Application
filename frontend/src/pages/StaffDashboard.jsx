import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./StaffDashboard.css";

function StaffDashboard({ staffUser, setStaffUser, onProductsChange }) {
  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [staffCart, setStaffCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  
  // Form states
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    originalPrice: "",
    discount: "",
    image: "",
    aisle_id: 1,
    department_id: 1
  });

  // Quick discount edit state
  const [editingDiscount, setEditingDiscount] = useState(null);
  const [discountValue, setDiscountValue] = useState("");
  
  const navigate = useNavigate();

  // Fetch products from API
  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/products/staff/")
      .then(res => res.json())
      .then(data => {
        // Transform API data
        const transformed = data.map(p => ({
          id: p.id,
          product_id: p.product_id,
          name: p.product_name,
          product_name: p.product_name,
          price: p.price,
          originalPrice: p.price * 1.2, // Default original price for display
          discount: 0,
          image: p.image || "",
          aisle_id: p.aisle_id,
          department_id: p.department_id
        }));
        setAllProducts(transformed);
        setFilteredProducts(transformed);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching products:", err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    // Filter products based on search term
    if (searchTerm.trim() === "") {
      setFilteredProducts(allProducts);
    } else {
      const filtered = allProducts.filter(p =>
        (p.name || p.product_name || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
        String(p.id).includes(searchTerm) ||
        String(p.product_id).includes(searchTerm)
      );
      setFilteredProducts(filtered);
    }
  }, [searchTerm, allProducts]);

  useEffect(() => {
    // Save staff cart to localStorage
    localStorage.setItem("staffCart", JSON.stringify(staffCart));
  }, [staffCart]);

  const handleLogout = () => {
    setStaffUser(null);
    localStorage.removeItem("staffUser");
    localStorage.removeItem("staffEmail");
    navigate("/");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAddToStaffCart = (product) => {
    const existingItem = staffCart.find(item => item.id === product.id);
    if (existingItem) {
      setStaffCart(staffCart.map(item => 
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      ));
      setSuccess(`Added another ${product.name} to cart!`);
    } else {
      setStaffCart([...staffCart, { ...product, quantity: 1 }]);
      setSuccess(`Added ${product.name} to cart!`);
    }
    setTimeout(() => setSuccess(""), 2000);
  };

  const handleRemoveFromStaffCart = (productId) => {
    setStaffCart(staffCart.filter(item => item.id !== productId));
  };

  const handleUpdateQuantity = (productId, delta) => {
    setStaffCart(staffCart.map(item => {
      if (item.id === productId) {
        const newQty = item.quantity + delta;
        return newQty > 0 ? { ...item, quantity: newQty } : item;
      }
      return item;
    }));
  };

  const getStaffCartTotal = () => {
    return staffCart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const handleClearStaffCart = () => {
    if (window.confirm("Clear the cart?")) {
      setStaffCart([]);
      setSuccess("Cart cleared!");
    }
  };

  const handleCheckout = () => {
    if (staffCart.length === 0) return;
    
    alert(`Purchase Order Created!\n\nTotal: ₹${getStaffCartTotal().toFixed(2)}\nItems: ${staffCart.length}`);
    setStaffCart([]);
    setSuccess("Purchase order submitted!");
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const formDataImg = new FormData();
      formDataImg.append('image', file);
      
      try {
        const res = await fetch('http://127.0.0.1:8000/api/products/upload/', {
          method: 'POST',
          body: formDataImg,
        });
        const data = await res.json();
        if (data.success) {
          setFormData(prev => ({ ...prev, image: data.image_url }));
        } else {
          const imageUrl = URL.createObjectURL(file);
          setFormData(prev => ({ ...prev, image: imageUrl }));
        }
      } catch (err) {
        const imageUrl = URL.createObjectURL(file);
        setFormData(prev => ({ ...prev, image: imageUrl }));
      }
    }
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const res = await fetch('http://127.0.0.1:8000/api/products/staff/add/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          price: parseFloat(formData.price),
          image: formData.image || "",
          aisle_id: parseInt(formData.aisle_id) || 1,
          department_id: parseInt(formData.department_id) || 1
        })
      });
      const data = await res.json();
      
      if (data.success) {
        const newProduct = {
          id: data.product.id,
          product_id: data.product.product_id,
          name: data.product.product_name,
          product_name: data.product.product_name,
          price: data.product.price,
          originalPrice: data.product.price * 1.2,
          discount: 0,
          image: data.product.image || "",
          aisle_id: data.product.aisle_id,
          department_id: data.product.department_id
        };
        
        setAllProducts([...allProducts, newProduct]);
        if (onProductsChange) onProductsChange();
        setSuccess("Product added successfully!");
        setFormData({ name: "", price: "", originalPrice: "", discount: "", image: "", aisle_id: 1, department_id: 1 });
        setShowAddForm(false);
      } else {
        setError(data.message || "Failed to add product");
      }
    } catch (err) {
      setError("Error adding product");
    }
  };

  const handleUpdateProduct = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const res = await fetch(`http://127.0.0.1:8000/api/products/staff/update/${editingProduct.id}/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          price: parseFloat(formData.price),
          image: formData.image || "",
          aisle_id: parseInt(formData.aisle_id) || 1,
          department_id: parseInt(formData.department_id) || 1
        })
      });
      const data = await res.json();
      
      if (data.success) {
        const updatedProducts = allProducts.map(p => {
          if (p.id === editingProduct.id) {
            return {
              ...p,
              name: formData.name,
              product_name: formData.name,
              price: parseFloat(formData.price),
              image: formData.image || p.image,
              aisle_id: parseInt(formData.aisle_id) || p.aisle_id,
              department_id: parseInt(formData.department_id) || p.department_id
            };
          }
          return p;
        });
        
        setAllProducts(updatedProducts);
        if (onProductsChange) onProductsChange();
        setSuccess("Product updated successfully!");
        setEditingProduct(null);
        setFormData({ name: "", price: "", originalPrice: "", discount: "", image: "", aisle_id: 1, department_id: 1 });
      } else {
        setError(data.message || "Failed to update product");
      }
    } catch (err) {
      setError("Error updating product");
    }
  };

  const handleDeleteProduct = async (productId) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    
    setError("");
    setSuccess("");

    try {
      const res = await fetch(`http://127.0.0.1:8000/api/products/staff/delete/${productId}/`, {
        method: 'POST'
      });
      const data = await res.json();
      
      if (data.success) {
        const updatedProducts = allProducts.filter(p => p.id !== productId);
        setAllProducts(updatedProducts);
        if (onProductsChange) onProductsChange();
        setSuccess("Product deleted successfully!");
      } else {
        setError(data.message || "Failed to delete product");
      }
    } catch (err) {
      setError("Error deleting product");
    }
  };

  const startEdit = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name || product.product_name,
      price: product.price,
      originalPrice: product.originalPrice || product.price,
      discount: product.discount || 0,
      image: product.image || "",
      aisle_id: product.aisle_id || 1,
      department_id: product.department_id || 1
    });
    setShowAddForm(false);
  };

  const cancelForm = () => {
    setShowAddForm(false);
    setEditingProduct(null);
    setFormData({ name: "", price: "", originalPrice: "", discount: "", image: "", aisle_id: 1, department_id: 1 });
  };

  if (loading) {
    return <div className="staff-dashboard loading">Loading products...</div>;
  }

  return (
    <div className="staff-dashboard">
      <div className="staff-header">
        <h1>Staff Dashboard - {allProducts.length} Products</h1>
        <div className="staff-info">
          <span>Welcome, {staffUser}</span>
          <button className="cart-toggle-btn" onClick={() => setShowCart(!showCart)}>
            🛒 Cart ({staffCart.length})
          </button>
          <button className="logout-btn" onClick={handleLogout}>Logout</button>
        </div>
      </div>

      {error && <div className="alert error">{error}</div>}
      {success && <div className="alert success">{success}</div>}

      <div className="dashboard-actions">
        <button 
          className="btn-primary" 
          onClick={() => { setShowAddForm(true); setEditingProduct(null); setFormData({ name: "", price: "", image: "", aisle_id: 1, department_id: 1 }); }}
        >
          + Add New Product
        </button>
      </div>

      <div className="search-container">
        <input
          type="text"
          placeholder="Search products by name or ID..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        {searchTerm && (
          <span className="search-count">
            Showing {filteredProducts.length} of {allProducts.length} products
          </span>
        )}
      </div>

      {(showAddForm || editingProduct) && (
        <div className="product-form-container">
          <h2>{editingProduct ? "Edit Product" : "Add New Product"}</h2>
          <form onSubmit={editingProduct ? handleUpdateProduct : handleAddProduct} className="product-form">
            <div className="form-group">
              <label>Product Name:</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                placeholder="Enter product name"
              />
            </div>
            
            <div className="form-group">
              <label>Price (₹):</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                required
                step="0.01"
                min="0"
                placeholder="Enter price"
              />
            </div>
            
            <div className="form-group">
              <label>Image URL:</label>
              <input
                type="text"
                name="image"
                value={formData.image}
                onChange={handleInputChange}
                placeholder="Enter image URL or use upload button"
              />
            </div>
            
            <div className="form-group">
              <label>Or Upload Image:</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="file-input"
              />
              {formData.image && (
                <div className="image-preview">
                  <img src={formData.image} alt="Preview" />
                  <button type="button" className="remove-image" onClick={() => setFormData(prev => ({ ...prev, image: "" }))}>✕</button>
                </div>
              )}
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label>Aisle ID:</label>
                <input
                  type="number"
                  name="aisle_id"
                  value={formData.aisle_id}
                  onChange={handleInputChange}
                  min="1"
                />
              </div>
              
              <div className="form-group">
                <label>Department ID:</label>
                <input
                  type="number"
                  name="department_id"
                  value={formData.department_id}
                  onChange={handleInputChange}
                  min="1"
                />
              </div>
            </div>
            
            <div className="form-actions">
              <button type="submit" className="btn-primary">
                {editingProduct ? "Update Product" : "Add Product"}
              </button>
              <button type="button" className="btn-secondary" onClick={cancelForm}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="products-table-container">
        <h2>Product Management ({allProducts.length} products)</h2>
        {filteredProducts.length === 0 ? (
          <p className="no-products">No products found. {searchTerm ? "Try a different search term." : "Add your first product!"}</p>
        ) : (
          <table className="products-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Product ID</th>
                <th>Image</th>
                <th>Name</th>
                <th>Price</th>
                <th>Aisle</th>
                <th>Dept</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.slice(0, 100).map(product => (
                <tr key={product.id}>
                  <td>{product.id}</td>
                  <td>{product.product_id}</td>
                  <td>
                    {product.image ? (
                      <img src={product.image} alt={product.name} className="product-thumb" />
                    ) : (
                      <span className="no-image">No Image</span>
                    )}
                  </td>
                  <td>{product.name || product.product_name}</td>
                  <td>₹{parseFloat(product.price).toFixed(2)}</td>
                  <td>{product.aisle_id}</td>
                  <td>{product.department_id}</td>
                  <td className="actions">
                    <button className="btn-edit" onClick={() => startEdit(product)}>Edit</button>
                    <button className="btn-delete" onClick={() => handleDeleteProduct(product.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        {filteredProducts.length > 100 && (
          <p style={{ textAlign: "center", padding: "20px", color: "#666" }}>
            Showing first 100 of {filteredProducts.length} products. Use search to find specific products.
          </p>
        )}
      </div>

      {/* Staff Cart Panel */}
      {showCart && (
        <div className="staff-cart-panel">
          <div className="cart-header">
            <h2>Cart ({staffCart.length})</h2>
            <button className="close-cart-btn" onClick={() => setShowCart(false)}>×</button>
          </div>
          
          {staffCart.length === 0 ? (
            <div className="empty-cart">Cart is empty</div>
          ) : (
            <>
              <div className="cart-items">
                {staffCart.map(item => (
                  <div key={item.id} className="cart-item">
                    {item.image && (
                      <img src={item.image} alt={item.name} className="cart-item-image" />
                    )}
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: "14px", fontWeight: 500 }}>{item.name}</div>
                      <div style={{ fontSize: "14px", color: "#666" }}>₹{parseFloat(item.price).toFixed(2)}</div>
                      <div style={{ display: "flex", alignItems: "center", gap: "10px", marginTop: "5px" }}>
                        <button onClick={() => handleUpdateQuantity(item.id, -1)} style={{ padding: "2px 8px" }}>-</button>
                        <span>{item.quantity}</span>
                        <button onClick={() => handleUpdateQuantity(item.id, 1)} style={{ padding: "2px 8px" }}>+</button>
                      </div>
                    </div>
                    <button onClick={() => handleRemoveFromStaffCart(item.id)} style={{ background: "red", color: "white", border: "none", padding: "5px", borderRadius: "3px", cursor: "pointer" }}>×</button>
                  </div>
                ))}
              </div>
              <div style={{ padding: "20px", borderTop: "1px solid #e0e0e0" }}>
                <div style={{ fontSize: "18px", fontWeight: "bold", marginBottom: "10px" }}>
                  Total: ₹{getStaffCartTotal().toFixed(2)}
                </div>
                <button className="btn-primary" style={{ width: "100%" }} onClick={handleCheckout}>
                  Checkout
                </button>
                <button className="btn-secondary" style={{ width: "100%", marginTop: "10px" }} onClick={handleClearStaffCart}>
                  Clear Cart
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default StaffDashboard;
