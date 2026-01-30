import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./EditProduct.css";


function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    rate: "",
  });
  const [image, setImage] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("adminToken");

    fetch(`https://texture-design-backend.onrender.com/api/products/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(res => res.json())
      .then(data => {
        setForm({
          title: data.title,
          rate: data.rate,
        });
      });
  }, [id]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("title", form.title);
    data.append("rate", form.rate);
    if (image) data.append("mainImage", image);

    const token = localStorage.getItem("adminToken");

    await fetch(`https://texture-design-backend.onrender.com/api/products/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: data,
    });

    alert("Product updated ✅");
    navigate(-1);
  };

  return (
<div className="edit-page">
  <div className="edit-form">
    <h2>Edit Product</h2>

    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="title"
        value={form.title}
        onChange={handleChange}
        placeholder="Product name"
      />

      <input
        type="number"
        name="rate"
        value={form.rate}
        onChange={handleChange}
        placeholder="Price per sqft"
      />

      <input
        type="file"
        accept="image/*"
        onChange={(e) => setImage(e.target.files[0])}
      />

      <button type="submit">Update Product</button>

      <button
        type="button"
        className="cancel-btn"
        onClick={() => navigate(-1)}
      >
        Cancel
      </button>
    </form>
  </div>
</div>

  );
}

export default EditProduct;
