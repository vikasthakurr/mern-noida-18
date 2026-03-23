import { useState, useRef, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectCartCount } from "../store/slices/cartSlice";
import { selectUser, logout } from "../store/slices/authSlice";
import { useSearch } from "../context/SearchContext";

const CATEGORIES = [
  { emoji: "🏠", label: "Home",            slug: "all"               },
  { emoji: "📱", label: "Electronics",     slug: "smartphones"       },
  { emoji: "👗", label: "Fashion",         slug: "womens-dresses"    },
  { emoji: "🛋️", label: "Furniture",       slug: "furniture"         },
  { emoji: "🔌", label: "Appliances",      slug: "home-decoration"   },
  { emoji: "💄", label: "Beauty",          slug: "beauty"            },
  { emoji: "🧸", label: "Toys",            slug: "toys"              },
  { emoji: "🛒", label: "Grocery",         slug: "groceries"         },
  { emoji: "⚽", label: "Sports",          slug: "sports-accessories"},
];

function Navbar() {
  const dispatch  = useDispatch();
  const navigate  = useNavigate();
  const cartCount = useSelector(selectCartCount);
  const user      = useSelector(selectUser);
  const { query, setQuery, navCategory, setNavCategory } = useSearch();

  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const userMenuRef = useRef(null);

  // close user dropdown on outside click
  useEffect(() => {
    const handler = (e) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target))
        setUserMenuOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    setUserMenuOpen(false);
    navigate("/login");
  };

  const handleCategory = (slug) => {
    setNavCategory(slug);
    navigate("/");
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50">

      {/* ── top bar ── */}
      <div className="bg-[#2874f0] shadow-lg">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center gap-3">

          {/* logo */}
          <NavLink to="/" onClick={() => setNavCategory("all")}
            className="shrink-0 flex flex-col leading-tight mr-2">
            <span className="text-white font-extrabold text-lg tracking-tight">ShopZone</span>
            <span className="text-yellow-300 text-[9px] italic font-semibold tracking-wide">Explore Plus ✦</span>
          </NavLink>

          {/* search bar */}
          <div className="flex-1 flex min-w-0">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search products, brands and more…"
              className="flex-1 min-w-0 px-4 py-2 text-sm text-gray-800 bg-white rounded-l focus:outline-none focus:ring-2 focus:ring-yellow-300"
            />
            <button
              onClick={() => { navigate("/"); }}
              className="bg-yellow-400 hover:bg-yellow-300 px-4 py-2 rounded-r transition-colors cursor-pointer shrink-0"
              aria-label="Search"
            >
              <svg className="w-4 h-4 text-[#2874f0]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5}
                  d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
              </svg>
            </button>
          </div>

          {/* right actions */}
          <div className="flex items-center gap-1 shrink-0 ml-1">

            {/* user menu */}
            {user ? (
              <div className="relative" ref={userMenuRef}>
                <button
                  onClick={() => setUserMenuOpen((o) => !o)}
                  className="flex items-center gap-2 text-white hover:bg-white/15 px-3 py-2 rounded transition-colors cursor-pointer"
                >
                  {user.avatar
                    ? <img src={user.avatar} className="w-7 h-7 rounded-full object-cover ring-2 ring-white/40" alt="" />
                    : <div className="w-7 h-7 rounded-full bg-yellow-400 flex items-center justify-center text-[#2874f0] text-xs font-bold">
                        {user.name?.charAt(0).toUpperCase()}
                      </div>
                  }
                  <span className="hidden sm:block text-sm font-medium max-w-[72px] truncate">
                    {user.name?.split(" ")[0]}
                  </span>
                  <svg className="w-3 h-3 text-white/70" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" />
                  </svg>
                </button>

                {userMenuOpen && (
                  <div className="absolute right-0 top-full mt-1 w-52 bg-white rounded-lg shadow-2xl border border-gray-100 overflow-hidden z-50">
                    <div className="px-4 py-3 bg-blue-50 border-b border-gray-100">
                      <p className="text-sm font-bold text-gray-800 truncate">{user.name}</p>
                      <p className="text-xs text-gray-500 truncate">{user.email}</p>
                    </div>
                    {[
                      { icon: "👤", label: "My Profile", path: "/profile" },
                      { icon: "📦", label: "My Orders",  path: "/orders"  },
                      { icon: "🛒", label: "My Cart",    path: "/cart"    },
                      ...(user.role === "admin" ? [{ icon: "⚙️", label: "Dashboard", path: "/admin" }] : []),
                    ].map(({ icon, label, path }) => (
                      <button key={path}
                        onClick={() => { navigate(path); setUserMenuOpen(false); }}
                        className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-[#2874f0] flex items-center gap-3 transition-colors cursor-pointer">
                        <span>{icon}</span>{label}
                      </button>
                    ))}
                    <div className="border-t border-gray-100">
                      <button onClick={handleLogout}
                        className="w-full text-left px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 flex items-center gap-3 transition-colors cursor-pointer">
                        <span>🚪</span>Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <NavLink to="/login"
                className="bg-white text-[#2874f0] font-bold text-sm px-5 py-2 rounded hover:bg-blue-50 transition-colors whitespace-nowrap">
                Login
              </NavLink>
            )}

            {/* cart */}
            <NavLink to="/cart"
              className="relative flex items-center gap-1.5 text-white hover:bg-white/15 px-3 py-2 rounded transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <span className="hidden sm:block text-sm font-medium">Cart</span>
              {cartCount > 0 && (
                <span className="absolute -top-0.5 left-5 bg-red-500 text-white text-[9px] font-bold rounded-full min-w-[16px] h-4 flex items-center justify-center px-0.5">
                  {cartCount}
                </span>
              )}
            </NavLink>

            {/* mobile hamburger */}
            <button
              onClick={() => setMobileMenuOpen((o) => !o)}
              className="lg:hidden text-white hover:bg-white/15 p-2 rounded transition-colors cursor-pointer"
              aria-label="Toggle categories"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d={mobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* ── category strip (desktop) ── */}
      <div className="hidden lg:block bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 flex overflow-x-auto scrollbar-hide">
          {CATEGORIES.map(({ emoji, label, slug }) => {
            const active = navCategory === slug;
            return (
              <button key={slug}
                onClick={() => handleCategory(slug)}
                className={`flex flex-col items-center gap-0.5 px-5 py-2.5 text-xs font-medium whitespace-nowrap border-b-2 transition-all cursor-pointer shrink-0 ${
                  active
                    ? "text-[#2874f0] border-[#2874f0] bg-blue-50/50"
                    : "text-gray-600 border-transparent hover:text-[#2874f0] hover:border-[#2874f0]"
                }`}>
                <span className="text-base leading-none">{emoji}</span>
                <span>{label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ── category strip (mobile dropdown) ── */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-gray-200 shadow-md">
          <div className="max-w-7xl mx-auto px-4 py-2 grid grid-cols-4 gap-1">
            {CATEGORIES.map(({ emoji, label, slug }) => {
              const active = navCategory === slug;
              return (
                <button key={slug}
                  onClick={() => handleCategory(slug)}
                  className={`flex flex-col items-center gap-1 px-2 py-3 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                    active
                      ? "text-[#2874f0] bg-blue-50"
                      : "text-gray-600 hover:text-[#2874f0] hover:bg-blue-50"
                  }`}>
                  <span className="text-xl">{emoji}</span>
                  <span className="text-center leading-tight">{label}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}

    </header>
  );
}

export default Navbar;
