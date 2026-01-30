import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ChangePassword.css";

function ChangePassword() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.newPassword !== form.confirmPassword) {
      alert("New password & confirm password not match ❌");
      return;
    }

    const token = localStorage.getItem("adminToken");
    if (!token) {
      navigate("/admin/login");
      return;
    }

    const res = await fetch(
      "https://texture-design-backend.onrender.com/api/auth/change-password",
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          oldPassword: form.oldPassword,
          newPassword: form.newPassword,
        }),
      }
    );

    const data = await res.json();

    if (!res.ok) {
      alert(data.message || "Password change failed ❌");
      return;
    }

    alert("Password changed successfully ✅");
    navigate("/admin");
  };

  return (
    <div className="change-page">
      <div className="change-box">
        <h2>Change Password</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="password"
            name="oldPassword"
            placeholder="Old password"
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="newPassword"
            placeholder="New password"
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm new password"
            onChange={handleChange}
            required
          />

          <button type="submit">Update Password</button>

          <button
            type="button"
            className="cancel-btn"
            onClick={() => navigate("/admin")}
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
}

export default ChangePassword;