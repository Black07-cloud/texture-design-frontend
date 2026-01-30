import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Interior from "./pages/Interior";
import Exterior from "./pages/Exterior";
import RoyalPlay from "./pages/RoyalPlay";
import WoodGrains from "./pages/WoodGrains";
import SilkPlast from "./pages/SilkPlast";
import AdminAddProduct from "./pages/AdminAddProduct";
import AdminLogin from "./pages/AdminLogin";
import ProtectedRoute from "./components/ProtectedAdmin";
import AdminDashboard from "./pages/AdminDashboard";
import EditProduct from "./pages/EditProduct";
import ChangePassword from "./pages/ChangePassword";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/interior" element={<Interior />} />
        <Route path="/exterior" element={<Exterior />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminDashboard />} />

        <Route path="/admin/add-product" element={<AdminAddProduct />} />
        <Route path="/admin/edit-product/:id" element={<EditProduct />} />
        <Route path="/admin/change-password" element={<ChangePassword />} />

        {/* Interior split pages */}
        <Route path="/interior/royal-play" element={<RoyalPlay />} />
        <Route path="/interior/wood-grains" element={<WoodGrains />} />
        <Route path="/interior/silk-plast" element={<SilkPlast />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
