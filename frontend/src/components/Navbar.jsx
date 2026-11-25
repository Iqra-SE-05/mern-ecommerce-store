import { Link, NavLink, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

function Navbar() {
  const navigate = useNavigate();
  const { totalItems } = useCart();
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  const handleLogout = () => {
    localStorage.removeItem("userInfo");
    navigate("/login");
  };

  const linkClass = ({ isActive }) =>
    `text-sm font-semibold transition ${
      isActive ? "text-gray-900 underline underline-offset-4" : "text-gray-800 hover:text-gray-900"
    }`;

  return (
    <header className="bg-[#F9B24E] border-b border-black/10 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <span className="w-9 h-9 rounded-xl bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 flex items-center justify-center">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-5 h-5"
            >
              <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
              <path d="M3 6h18" />
              <path d="M16 10a4 4 0 0 1-8 0" />
            </svg>
          </span>
          <span className="text-xl font-extrabold tracking-tight text-gray-900">
            ShopStudio
          </span>
        </Link>

        {/* Right side */}
        <div className="flex items-center gap-3 sm:gap-5">
          {userInfo && (
            <NavLink to="/orders" className={linkClass}>
              My Orders
            </NavLink>
          )}
          {userInfo && userInfo.role === "admin" && (
            <>
              <NavLink to="/admin" className={linkClass}>
                Products
              </NavLink>
              <NavLink to="/admin/orders" className={linkClass}>
                Manage Orders
              </NavLink>
            </>
          )}

          <Link
            to="/cart"
            className="relative p-2 text-gray-900 hover:scale-110 transition"
            aria-label="Cart"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-6 h-6"
            >
              <circle cx="8" cy="21" r="1" />
              <circle cx="19" cy="21" r="1" />
              <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
            </svg>
            {totalItems > 0 && (
              <span className="absolute -top-0.5 -right-0.5 bg-gray-900 text-white text-[10px] font-bold min-w-[18px] h-[18px] px-1 rounded-full flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </Link>

          {userInfo ? (
            <>
              <span className="hidden md:block text-sm font-medium text-gray-900">
                Hi, {userInfo.name}
              </span>
              <button
                onClick={handleLogout}
                className="text-sm font-semibold border-2 border-gray-900 text-gray-900 px-4 py-1 rounded-full hover:bg-gray-900 hover:text-white transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-sm font-semibold text-gray-900 hover:underline"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="text-sm font-semibold text-white bg-gray-900 px-5 py-1.5 rounded-full hover:bg-gray-700 transition"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export default Navbar;