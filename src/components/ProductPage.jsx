import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ProductPage.css";

function ProductPage({ title, category, subCategory }) {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  const isAdmin = !!localStorage.getItem("adminToken");

  useEffect(() => {
    fetch(
      `https://texture-design-backend.onrender.com/api/products/category/${category}/${subCategory}`
    )
      .then(res => res.json())
      .then(data => setProducts(data));
  }, [category, subCategory]);

  const deleteProduct = async (id) => {
    if (!window.confirm("Delete this product permanently?")) return;

    const token = localStorage.getItem("adminToken");

    await fetch(`https://texture-design-backend.onrender.com/api/products/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setProducts(prev => prev.filter(p => p._id !== id));
  };

  return (
    <div className="product-page">
      <h2 className="page-title">{title}</h2>

      <div className="product-grid">
        {products.map(item => (
          <div key={item._id} className="product-card">
            <p className="product-name">{item.title}</p>

           <div className="image-box">
             <img 
              src={item.mainImage}
              alt={item.title}
              className="product-image"
            />
           </div>

            <p className="product-price">₹{item.rate} / sqft</p>

            {!isAdmin && (
              <a
                className="whatsapp-btn"
                href={`https://wa.me/919994886016?text=${encodeURIComponent(
                  `I want ${item.title} - ₹${item.rate}/sqft\n${item.mainImage}`
                )}`}
                target="_blank"
                rel="noreferrer"
              >
                Order on WhatsApp
              </a>
            )}

            {isAdmin && (
              <div className="admin-actions">
                <button
                  className="edit-btn"
                  onClick={() => navigate(`/admin/edit-product/${item._id}`)}
                >
                  ✏️ Edit
                </button>

                <button
                  className="delete-btn"
                  onClick={() => deleteProduct(item._id)}
                >
                  🗑 Delete
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductPage;
