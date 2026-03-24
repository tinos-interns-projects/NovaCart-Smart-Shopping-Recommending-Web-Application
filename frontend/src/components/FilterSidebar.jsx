import React, { useState, useEffect } from "react";
import "./FilterSidebar.css";

export default function FilterSidebar({ products, filters, setFilters, onFilterChange }) {
  const [priceRange, setPriceRange] = useState({ min: 0, max: 200000 });
  const [expandedSections, setExpandedSections] = useState({
    price: true,
    discount: true,
  });

  // Get price range from products
  useEffect(() => {
    if (products.length > 0) {
      const prices = products.map((p) => p.price);
      const minPrice = Math.min(...prices);
      const maxPrice = Math.max(...prices);
      setPriceRange({ min: minPrice, max: maxPrice });
    }
  }, [products]);

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const handlePriceChange = (type, value) => {
    const newRange = { ...filters.priceRange };
    if (type === "min") {
      newRange.min = parseInt(value) || 0;
    } else {
      newRange.max = parseInt(value) || priceRange.max;
    }
    setFilters({ ...filters, priceRange: newRange });
    onFilterChange();
  };

  const handlePriceSliderChange = (type, value) => {
    const newRange = { ...filters.priceRange };
    if (type === "min") {
      newRange.min = parseInt(value);
    } else {
      newRange.max = parseInt(value);
    }
    setFilters({ ...filters, priceRange: newRange });
    onFilterChange();
  };

  const handleDiscountChange = (discount) => {
    setFilters({ ...filters, minDiscount: discount });
    onFilterChange();
  };

  const handleSortChange = (sortBy) => {
    setFilters({ ...filters, sortBy });
    onFilterChange();
  };

  const clearAllFilters = () => {
    setFilters({
      priceRange: { min: priceRange.min, max: priceRange.max },
      minDiscount: 0,
      sortBy: "relevance",
    });
    onFilterChange();
  };

  const hasActiveFilters =
    filters.minDiscount > 0 ||
    filters.sortBy !== "relevance" ||
    filters.priceRange.min > priceRange.min ||
    filters.priceRange.max < priceRange.max;

  return (
    <div className="filter-sidebar">
      <div className="filter-header">
        <h3>Filters</h3>
        {hasActiveFilters && (
          <button className="clear-filters" onClick={clearAllFilters}>
            Clear All
          </button>
        )}
      </div>

      {/* Sort By Section */}
      <div className="filter-section">
        <div
          className="section-header"
          onClick={() => toggleSection("sort")}
        >
          <span>Sort By</span>
          <span className="expand-icon">{expandedSections.sort ? "−" : "+"}</span>
        </div>
        {expandedSections.sort && (
          <div className="section-content">
            <select
              value={filters.sortBy}
              onChange={(e) => handleSortChange(e.target.value)}
              className="sort-select"
            >
              <option value="relevance">Relevance</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="discount">Discount</option>
            </select>
          </div>
        )}
      </div>

      {/* Price Range Section */}
      <div className="filter-section">
        <div
          className="section-header"
          onClick={() => toggleSection("price")}
        >
          <span>Price</span>
          <span className="expand-icon">{expandedSections.price ? "−" : "+"}</span>
        </div>
        {expandedSections.price && (
          <div className="section-content">
            <div className="price-inputs">
              <div className="price-input-group">
                <span className="currency-symbol">₹</span>
                <input
                  type="number"
                  placeholder="Min"
                  value={filters.priceRange.min}
                  onChange={(e) => handlePriceChange("min", e.target.value)}
                  onBlur={onFilterChange}
                />
              </div>
              <span className="price-separator">to</span>
              <div className="price-input-group">
                <span className="currency-symbol">₹</span>
                <input
                  type="number"
                  placeholder="Max"
                  value={filters.priceRange.max}
                  onChange={(e) => handlePriceChange("max", e.target.value)}
                  onBlur={onFilterChange}
                />
              </div>
            </div>
            <div className="price-slider">
              <input
                type="range"
                min={priceRange.min}
                max={priceRange.max}
                value={filters.priceRange.min}
                onChange={(e) => handlePriceSliderChange("min", e.target.value)}
                className="slider slider-min"
              />
              <input
                type="range"
                min={priceRange.min}
                max={priceRange.max}
                value={filters.priceRange.max}
                onChange={(e) => handlePriceSliderChange("max", e.target.value)}
                className="slider slider-max"
              />
            </div>
            <div className="price-range-display">
              <span>₹{filters.priceRange.min.toLocaleString()}</span>
              <span>₹{filters.priceRange.max.toLocaleString()}</span>
            </div>
          </div>
        )}
      </div>

      {/* Discount Section */}
      <div className="filter-section">
        <div
          className="section-header"
          onClick={() => toggleSection("discount")}
        >
          <span>Discount</span>
          <span className="expand-icon">{expandedSections.discount ? "−" : "+"}</span>
        </div>
        {expandedSections.discount && (
          <div className="section-content">
            {[25, 20, 15, 10].map((discount) => (
              <label key={discount} className="filter-radio">
                <input
                  type="radio"
                  name="discount"
                  checked={filters.minDiscount === discount}
                  onChange={() => handleDiscountChange(discount)}
                />
                <span className="discount-label">{discount}% and Above</span>
              </label>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
