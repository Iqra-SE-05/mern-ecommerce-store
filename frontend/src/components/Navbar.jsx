import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

function Navbar() {
  const navigate = useNavigate();
  const { totalItems } = useCart();
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  const handleLogout = () => {
    localStorage.removeItem("userInfo");
    navigate("/login");
  };

  return (
    <nav className="bg-indigo-600 text-white px-8 py-4 shadow flex justify-between items-center">
      <Link to="/" className="text-2xl font-bold">
        My Store
      </Link>

      <div className="flex items-center gap-4">
        <Link to="/cart" className="text-sm hover:underline">
  Cart ({totalItems})
</Link>
        {userInfo ? (
          <>
            <span className="text-sm">Hi, {userInfo.name}</span>
            <button
              onClick={handleLogout}
              className="bg-white text-indigo-600 px-4 py-1 rounded-lg text-sm font-semibold hover:bg-gray-100"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="text-sm hover:underline">
              Login
            </Link>
            <Link
              to="/register"
              className="bg-white text-indigo-600 px-4 py-1 rounded-lg text-sm font-semibold hover:bg-gray-100"
            >
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;