import { useState } from "react";
import "./Review.css";

function ReviewForm({ refresh }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    rating: 5,
    comment: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    await fetch("https://texture-design-backend.onrender.com/api/reviews", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    alert("Review added successfully ✅");
    setForm({ name: "", email: "", rating: 5, comment: "" });

    if (refresh) refresh();
  };

  return (
    <form className="review-form" onSubmit={handleSubmit}>
      <h3>Add Your Review</h3>

      <input
        name="name"
        placeholder="Your Name"
        required
        value={form.name}
        onChange={handleChange}
      />

      <input
        name="email"
        type="email"
        placeholder="Your Gmail"
        required
        value={form.email}
        onChange={handleChange}
      />

      <select
        name="rating"
        value={form.rating}
        onChange={handleChange}
      >
        <option value="5">⭐⭐⭐⭐⭐</option>
        <option value="4">⭐⭐⭐⭐</option>
        <option value="3">⭐⭐⭐</option>
        <option value="2">⭐⭐</option>
        <option value="1">⭐</option>
      </select>

      <textarea
        name="comment"
        placeholder="Write your comment"
        required
        value={form.comment}
        onChange={handleChange}
      />

      <button type="submit">Submit Review</button>
    </form>
  );
}

export default ReviewForm;