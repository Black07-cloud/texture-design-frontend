import { useNavigate } from "react-router-dom";
import "./AdminProfile.css";

function AdminProfile() {
  const navigate = useNavigate();

  return (
    <div className="admin-avatar" onClick={() => navigate("/admin")}>
      <img
        src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
        alt="Admin"
      />
      <span>Admin</span>
    </div>
  );
}

export default AdminProfile;