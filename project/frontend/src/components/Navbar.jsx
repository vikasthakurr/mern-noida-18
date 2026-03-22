import { useState, useRef, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectCartCount } from "../store/slices/cartSlice";
import { selectUser, logout } from "../store/slices/authSlice";
import { useSearch } from "../context/SearchContext";

function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartCount = useSelector(selectCartCount);
  const user = useSelector(selectUser);
  const { query, setQuery } = useSearch();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // close dropdown on outside click
  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    setDropdownOpen(false);
    navigate("/login");
  };

  const links = [
    { label: "Home", to: "/" },
    { label: "Products", to: "/products" },
  ];

  return (
    <nav className="bg-[#1a1a2e] sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center gap-6">

        {/* brand */}
        <NavLink to="/" className="text-2xl font-bold text-[#e94560] shrink-0">
          🛒 ShopZone
        </NavLink>

        {/* search — grows to fill available space */}
        <div className="flex-1 max-w-md relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">🔍</span>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search products..."
            className="w-full bg-[#0f0f1a] text-gray-200 placeholder-gray-500 text-sm rounded-lg pl-9 pr-4 py-2 border border-[#2e2e4a] focus:outline-none focus:border-[#e94560] transition-colors"
          />
          {/* clear button */}
          {query && (
            <button
              onClick={() => setQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white text-xs cursor-pointer"
            >
              ✕
            </button>
          )}
        </div>

        {/* nav links */}
        <ul className="flex gap-6 list-none m-0 p-0 items-center shrink-0">
          {links.map(({ label, to }) => (
            <li key={to}>
              <NavLink
                to={to}
                className={({ isActive }) =>
                  `text-sm font-medium transition-colors duration-200 ${
                    isActive ? "text-[#e94560]" : "text-gray-300 hover:text-[#e94560]"
                  }`
                }
              >
                {label}
              </NavLink>
            </li>
          ))}

          {/* cart with badge */}
          <li>
            <NavLink
              to="/cart"
              className={({ isActive }) =>
                `relative text-sm font-medium transition-colors duration-200 ${
                  isActive ? "text-[#e94560]" : "text-gray-300 hover:text-[#e94560]"
                }`
              }
            >
              🛒 Cart
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-4 bg-[#e94560] text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </NavLink>
          </li>

          {/* auth */}
          {user ? (
            <li className="relative" ref={dropdownRef}>
              {/* avatar button */}
              <button
                onClick={() => setDropdownOpen((o) => !o)}
                className="flex items-center gap-2 cursor-pointer focus:outline-none"
              >
                {user.avatar ? (
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-8 h-8 rounded-full object-cover border-2 border-[#e94560]"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-[#e94560] flex items-center justify-center text-white text-sm font-bold">
                    {user.name?.charAt(0).toUpperCase()}
                  </div>
                )}
              </button>

              {/* dropdown */}
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-44 bg-white rounded-xl shadow-lg border border-gray-100 py-1 z-50">
                  <div className="px-4 py-2 border-b border-gray-100">
                    <p className="text-xs font-semibold text-[#1a1a2e] truncate">{user.name}</p>
                    <p className="text-[10px] text-gray-400 truncate">{user.email}</p>
                  </div>
                  <button
                    onClick={() => { navigate("/profile"); setDropdownOpen(false); }}
                    className="w-full text-left px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-[#e94560] transition-colors cursor-pointer"
                  >
                    👤 Profile
                  </button>
                  {user.role === "admin" && (
                    <button
                      onClick={() => { navigate("/admin"); setDropdownOpen(false); }}
                      className="w-full text-left px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-[#e94560] transition-colors cursor-pointer"
                    >
                      ⚙️ Dashboard
                    </button>
                  )}
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-gray-50 transition-colors cursor-pointer"
                  >
                    🚪 Logout
                  </button>
                </div>
              )}
            </li>
          ) : (
            <li>
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  `text-sm font-medium transition-colors duration-200 ${
                    isActive ? "text-[#e94560]" : "text-gray-300 hover:text-[#e94560]"
                  }`
                }
              >
                Login
              </NavLink>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
