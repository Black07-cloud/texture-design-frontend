import { useState } from "react";
import "./AdminAddProduct.css";

function AdminAddProduct() {
  const [form, setForm] = useState({
    title: "",
    subCategory: "royal-play",
    rate: "",
  });
  const [image, setImage] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const category =
      form.subCategory === "exterior" ? "Exterior" : "Interior";

    const data = new FormData();
    data.append("title", form.title);
    data.append("category", category);
    data.append("subCategory", form.subCategory);
    data.append("rate", form.rate);
    data.append("mainImage", image);

    const token = localStorage.getItem("adminToken");

    const res = await fetch("https://texture-design-backend.onrender.com/api/products/add", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: data,
    });

    const result = await res.json();
    console.log(result);
    alert("Product added ✅");
  };

  return (
    <div className="admin-page">
      <div className="admin-form">
        <h2>Add Product</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="title"
            placeholder="Product name"
            onChange={handleChange}
            required
          />

          {/* 🔥 IMPORTANT FIX */}
          <select
            name="subCategory"
            value={form.subCategory}
            onChange={handleChange}
          >
            <option value="royal-play">Royal Play Works</option>
            <option value="wood-grains">Wood Grains Works</option>
            <option value="silk-plast">Silk Plast Wallpaper</option>
            <option value="exterior">Exterior</option>
          </select>

          <input
            type="number"
            name="rate"
            placeholder="Price per sqft"
            onChange={handleChange}
            required
          />

          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            required
          />

          <button type="submit">Upload</button>
        </form>
      </div>
    </div>
  );
}

export default AdminAddProduct;