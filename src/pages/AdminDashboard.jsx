import { useNavigate } from "react-router-dom";
import adminPhoto from "../assets/admin.jpeg";
import "./AdminDashboard.css";

function AdminDashboard() {
  const navigate = useNavigate();
  const isAdmin = !!localStorage.getItem("adminToken");

  const logout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin"); // refresh dashboard
  };

  return (
    <div className="admin-layout">
      {/* LEFT IMAGE */}
      <div className="admin-left">
        <img src={adminPhoto} alt="Admin" />
      </div>

      {/* RIGHT CONTENT */}
      <div className="admin-right">
        <h2 className="admin-name">Angamuthu A</h2>
        <p className="admin-company">A³ Texture Finishes</p>
        <p className="admin-phone">📞 +91 99948 86016</p>

       <div className="admin-desc">
  <h3>About A³ Texture Finishes</h3>

  <p>
    A³ Texture Finishes is a professional texture painting company
    specializing in high-quality interior and exterior finishes.
    We focus on modern designs, premium materials, and long-lasting results.
  </p>

  <p>
    Our expertise includes:
    <br />• Royal Play Works  
    <br />• Wood Grains Texture  
    <br />• Silk Plast Wallpaper  
    <br />• Exterior Texture Painting
  </p>

  <p>
    We ensure customer satisfaction through skilled workmanship,
    creative designs, and reliable service.
  </p>
</div>

        {/* 🔐 LOGIN / ADMIN ACTIONS */}
        {!isAdmin && (
          <button
            className="login-btn"
            onClick={() => navigate("/admin/login")}
          >
            🔐 Admin Login
          </button>
        )}

        {isAdmin && (
          <>
            <button onClick={() => navigate("/admin/add-product")}>
              ➕ Add Product
            </button>

            <button className="logout" onClick={logout}>
              🚪 Logout
            </button>
            <button onClick={() => navigate("/admin/change-password")}>
  🔐 Change Password
</button>
          </>
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;