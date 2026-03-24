import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Register from "./pages/Register";
import StaffLogin from "./pages/StaffLogin";
import StaffDashboard from "./pages/StaffDashboard";
import Recommendations from "./pages/Recommendations";
import "./App.css";

function getLocalCart() {
  const stored = localStorage.getItem("cart");
  return stored ? JSON.parse(stored) : [];
}

function saveLocalCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}

export default function App() {
  const [cart, setCart] = useState(() => getLocalCart());
  const [search, setSearch] = useState("");
  const [user, setUser] = useState(localStorage.getItem("user") || null);
  const [staffUser, setStaffUser] = useState(localStorage.getItem("staffUser") || null);
  const [productsData, setProductsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({
    page: 1,
    page_size: 20,
    total_count: 0,
    total_pages: 0
  });
  const [currentPage, setCurrentPage] = useState(1);

  // Fetch products from API with pagination and search
  const fetchProducts = (page = 1, search = "") => {
    setLoading(true);
    const searchParam = search ? `&search=${encodeURIComponent(search)}` : "";
    fetch(`http://127.0.0.1:8000/api/products/?page=${page}&page_size=20${searchParam}`)
      .then(res => res.json())
      .then(data => {
        // Transform API data to match frontend format
        const products = data.products.map(p => ({
          id: p.id,
          product_id: p.product_id,
          name: p.product_name,
          product_name: p.product_name,
          price: p.price,
          originalPrice: p.original_price,
          original_price: p.original_price,
          discount: p.discount,
          image: p.image || "https://via.placeholder.com/200x200?text=No+Image",
          aisle_id: p.aisle_id,
          department_id: p.department_id,
          department: p.department_id,
          category: p.department_id
        }));
        setProductsData(products);
        setPagination(data.pagination);
        setCurrentPage(data.pagination.page);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching products:", err);
        setLoading(false);
      });
  };

  // Fetch products on component mount and when search changes
  useEffect(() => {
    fetchProducts(1, search);
  }, []);

  // Fetch products when search changes
  useEffect(() => {
    fetchProducts(1, search);
  }, [search]);

  const filteredProducts = productsData;

  // Load cart from API when user changes
  useEffect(() => {
    if (user) {
      fetch(`http://127.0.0.1:8000/api/cart/get/${user}/`)
        .then(res => res.json())
        .then(data => {
          if (Array.isArray(data) && data.length > 0) {
            const apiCart = data.map(item => ({
              id: item.product_id,
              name: item.product_name,
              price: item.price,
              quantity: item.quantity,
              image: item.image || "https://via.placeholder.com/200x200?text=No+Image",
              aisle_id: item.aisle_id || 1,
              department_id: item.department_id || 1
            }));
            setCart(apiCart);
            saveLocalCart(apiCart);
          } else {
            setCart([]);
            saveLocalCart([]);
          }
        })
        .catch(() => {
          setCart(getLocalCart());
        });
    } else {
      setCart(getLocalCart());
    }
  }, [user]);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    saveLocalCart(cart);
  }, [cart]);

  // Refresh products
  const refreshProducts = (page = 1) => {
    fetch(`http://127.0.0.1:8000/api/products/?page=${page}&page_size=20`)
      .then(res => res.json())
      .then(data => {
        const transformed = data.products.map(p => ({
          id: p.id,
          product_id: p.product_id,
          name: p.product_name,
          product_name: p.product_name,
          price: p.price,
          originalPrice: p.original_price,
          original_price: p.original_price,
          discount: p.discount,
          image: p.image || "https://via.placeholder.com/200x200?text=No+Image",
          aisle_id: p.aisle_id,
          department_id: p.department_id,
          department: p.department_id,
          category: p.department_id
        }));
        setProductsData(transformed);
        setPagination(data.pagination);
        setCurrentPage(data.pagination.page);
      });
  };

  if (loading) {
    return (
      <Router>
        <Navbar cart={[]} searchTerm="" setSearchTerm={() => {}} user={null} setUser={() => {}} staffUser={null} setStaffUser={() => {}} />
        <div style={{ padding: "50px", textAlign: "center" }}>
          <h2>Loading products...</h2>
        </div>
      </Router>
    );
  }

  return (
    <Router>
      <Navbar 
        cart={cart} 
        searchTerm={search} 
        setSearchTerm={setSearch}
        user={user}
        setUser={setUser}
        staffUser={staffUser}
        setStaffUser={setStaffUser}
      />
      <Routes>
        <Route 
          path="/" 
          element={
            <div className="main">
              <Products
                products={productsData}
                cart={cart}
                setCart={setCart}
                user={user}
                searchTerm={search}
                pagination={pagination}
                currentPage={currentPage}
                onPageChange={fetchProducts}
              />
              <Cart cart={cart} setCart={setCart} user={user} />
            </div>
          } 
        />
        <Route 
          path="/cart" 
          element={<Cart cart={cart} setCart={setCart} user={user} />} 
        />
        <Route 
          path="/login" 
          element={<Login setUser={setUser} />} 
        />
        <Route 
          path="/register" 
          element={<Register />} 
        />
        <Route 
          path="/staff-login" 
          element={<StaffLogin setStaffUser={setStaffUser} />} 
        />
        <Route 
          path="/staff-dashboard" 
          element={<StaffDashboard staffUser={staffUser} setStaffUser={setStaffUser} onProductsChange={refreshProducts} />} 
        />
        <Route 
          path="/recommendations" 
          element={<Recommendations />} 
        />
      </Routes>
    </Router>
  );
}
