import { useState, useEffect } from 'react';

function ProductCard({ product, addToCart }) {
    const [relatedProducts, setRelatedProducts] = useState([]);
    const [showRelated, setShowRelated] = useState(false);
    const [loadingRelated, setLoadingRelated] = useState(false);

    // Fetch related products when showRelated is toggled
    useEffect(() => {
        if (showRelated && relatedProducts.length === 0) {
            setLoadingRelated(true);
            fetch(`http://127.0.0.1:8000/api/products/related/${product.product_id || product.id}/`)
                .then(res => res.json())
                .then(data => {
                    setRelatedProducts(data.related_products || []);
                    setLoadingRelated(false);
                })
                .catch(() => {
                    setLoadingRelated(false);
                });
        }
    }, [showRelated, product.product_id, product.id]);

    const handleProductClick = () => {
        setShowRelated(!showRelated);
    };

    return (
        <div className="product-card">
            <div className="product-image-container" onClick={handleProductClick} style={{ cursor: 'pointer' }}>
                {product.image && (
                    <img 
                        src={product.image.startsWith('http') ? product.image : `http://127.0.0.1:8000${product.image}`} 
                        alt={product.product_name} 
                    />
                )}
                {product.discount > 0 && (
                    <span className="product-discount">{product.discount}% off</span>
                )}
            </div>
            <div className="product-info">
                <span className="product-category">
                    {product.department_id || 'General'} • {product.aisle_id || 'All'}
                </span>
                <h3 className="product-name" onClick={handleProductClick} style={{ cursor: 'pointer' }}>
                    {product.product_name}
                </h3>
                <div className="product-price-container">
                    <span className="product-price">₹{product.price}</span>
                    {product.original_price && (
                        <>
                            <span className="product-original-price">₹{product.original_price}</span>
                            {product.discount > 0 && (
                                <span className="product-save">Save ₹{Math.round(product.original_price - product.price)}</span>
                            )}
                        </>
                    )}
                </div>
            </div>
            <button 
                className="add-to-cart-btn" 
                onClick={() => addToCart(product.id || product.product_id)}
            >
                ADD TO CART
            </button>

            {/* Related Products Section */}
            {showRelated && (
                <div className="related-products-section">
                    <h4>Related Products</h4>
                    {loadingRelated ? (
                        <p>Loading related products...</p>
                    ) : relatedProducts.length > 0 ? (
                        <div className="related-products-grid">
                            {relatedProducts.slice(0, 4).map((related) => (
                                <div 
                                    key={related.product_id} 
                                    className="related-product-item"
                                    onClick={() => {
                                        // Navigate to product or add to cart
                                        addToCart(related.product_id);
                                        setShowRelated(false);
                                    }}
                                >
                                    <img 
                                        src={related.image || "https://via.placeholder.com/80x80?text=No+Image"} 
                                        alt={related.product_name}
                                    />
                                    <div className="related-product-info">
                                        <span className="related-product-name">
                                            {related.product_name.substring(0, 25)}{related.product_name.length > 25 ? '...' : ''}
                                        </span>
                                        <span className="related-product-price">₹{related.price}</span>
                                        <span className="related-product-relationship">
                                            {related.relationship === 'same_aisle' ? '📦 Same Category' : 
                                             related.relationship === 'same_department' ? '🏷️ Same Department' : 
                                             '✨ Similar Product'}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p>No related products found</p>
                    )}
                </div>
            )}
        </div>
    );
}

export default ProductCard;
