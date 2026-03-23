import { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadProducts } from "../store/slices/productSlice";
import { useSearch } from "../context/SearchContext";
import { addToCart, selectCartItems, updateQty, removeFromCart } from "../store/slices/cartSlice";
import Card from "../components/Card";
import CardSkeleton from "../components/CardSkeleton";

const SKELETON_COUNT = 20;
const SORT_OPTIONS = [
  { label: "Relevance",          value: "default"   },
  { label: "Price: Low to High", value: "price_asc" },
  { label: "Price: High to Low", value: "price_desc"},
  { label: "Top Rated",          value: "rating"    },
  { label: "Name: A to Z",       value: "name_asc"  },
];

// deterministic "discount" from product id so it's stable across renders
const getDiscount = (id) => 10 + (id % 5) * 5; // 10 / 15 / 20 / 25 / 30 %

// countdown to midnight
function useCountdown() {
  const getSecsLeft = () => {
    const now  = new Date();
    const end  = new Date(now); end.setHours(23, 59, 59, 999);
    return Math.floor((end - now) / 1000);
  };
  const [secs, setSecs] = useState(getSecsLeft);
  useEffect(() => {
    const t = setInterval(() => setSecs(getSecsLeft()), 1000);
    return () => clearInterval(t);
  }, []);
  const h = String(Math.floor(secs / 3600)).padStart(2, "0");
  const m = String(Math.floor((secs % 3600) / 60)).padStart(2, "0");
  const s = String(secs % 60).padStart(2, "0");
  return { h, m, s };
}

function TimeBox({ value, label }) {
  return (
    <div className="flex flex-col items-center">
      <span className="bg-gray-900 text-white font-bold text-lg w-10 h-10 flex items-center justify-center rounded-lg tabular-nums">
        {value}
      </span>
      <span className="text-[9px] text-gray-500 mt-0.5 uppercase tracking-wide">{label}</span>
    </div>
  );
}

function DealCard({ product }) {
  const dispatch   = useDispatch();
  const cartItems  = useSelector(selectCartItems);
  const cartItem   = cartItems.find((i) => i.id === product.id);
  const qty        = cartItem?.qty ?? 0;
  const discount   = getDiscount(product.id);
  const original   = (product.price / (1 - discount / 100)).toFixed(2);

  const handleDecrement = () =>
    qty === 1
      ? dispatch(removeFromCart(product.id))
      : dispatch(updateQty({ id: product.id, qty: qty - 1 }));

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow flex flex-col w-44 shrink-0 overflow-hidden group">
      <div className="relative h-36 bg-gray-50 flex items-center justify-center p-3">
        <img src={product.thumbnail} alt={product.title}
          className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300" />
        <span className="absolute top-2 left-2 bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">
          -{discount}%
        </span>
      </div>
      <div className="p-3 flex flex-col gap-1 flex-1">
        <p className="text-xs font-medium text-gray-800 line-clamp-2 leading-snug">{product.title}</p>
        <div className="flex items-center gap-1 mt-auto">
          <span className="text-sm font-bold text-gray-900">${product.price}</span>
          <span className="text-xs text-gray-400 line-through">${original}</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="bg-green-600 text-white text-[9px] font-bold px-1.5 py-0.5 rounded">
            {product.rating} ★
          </span>
        </div>
        {qty === 0 ? (
          <button
            onClick={() => dispatch(addToCart({ id: product.id, image: product.thumbnail, title: product.title, price: product.price }))}
            className="mt-1 w-full py-1.5 bg-[#fb641b] hover:bg-orange-600 text-white text-xs font-bold rounded transition-colors cursor-pointer">
            Add to Cart
          </button>
        ) : (
          <div className="mt-1 flex items-center justify-between bg-[#fb641b] rounded px-1 py-0.5">
            <button onClick={handleDecrement}
              className="w-6 h-6 text-white font-bold flex items-center justify-center cursor-pointer hover:bg-orange-600 rounded text-base">−</button>
            <span className="text-xs font-bold text-white">{qty}</span>
            <button onClick={() => dispatch(updateQty({ id: product.id, qty: qty + 1 }))}
              className="w-6 h-6 text-white font-bold flex items-center justify-center cursor-pointer hover:bg-orange-600 rounded text-base">+</button>
          </div>
        )}
      </div>
    </div>
  );
}

function Home() {
  const dispatch = useDispatch();
  const { items: products, loading, error } = useSelector((s) => s.products);
  const { normalizedQuery, navCategory, setNavCategory } = useSearch();
  const { h, m, s } = useCountdown();

  const [sort, setSort]         = useState("default");
  const [category, setCategory] = useState("all");
  const [maxPrice, setMaxPrice] = useState(2000);
  const [minPrice, setMinPrice] = useState(0);
  const [minRating, setMinRating] = useState(0);

  useEffect(() => { setCategory(navCategory); }, [navCategory]);
  useEffect(() => { if (products.length === 0) dispatch(loadProducts(100)); }, [dispatch, products.length]);

  const categories = useMemo(() => {
    const cats = [...new Set(products.map((p) => p.category))];
    return ["all", ...cats.sort()];
  }, [products]);

  const priceMax = useMemo(
    () => Math.ceil(Math.max(...products.map((p) => p.price), 2000)),
    [products]
  );

  // top 12 rated products as "deals"
  const deals = useMemo(
    () => [...products].sort((a, b) => b.rating - a.rating).slice(0, 12),
    [products]
  );

  const displayed = useMemo(() => {
    let r = [...products];
    if (normalizedQuery) r = r.filter((p) =>
      p.title.toLowerCase().includes(normalizedQuery) ||
      p.category.toLowerCase().includes(normalizedQuery)
    );
    if (category !== "all") r = r.filter((p) => p.category === category);
    r = r.filter((p) => p.price >= minPrice && p.price <= maxPrice);
    if (minRating > 0) r = r.filter((p) => p.rating >= minRating);
    if (sort === "price_asc")  r.sort((a, b) => a.price - b.price);
    if (sort === "price_desc") r.sort((a, b) => b.price - a.price);
    if (sort === "rating")     r.sort((a, b) => b.rating - a.rating);
    if (sort === "name_asc")   r.sort((a, b) => a.title.localeCompare(b.title));
    return r;
  }, [products, category, minPrice, maxPrice, minRating, sort, normalizedQuery]);

  const clearAll = () => {
    setCategory("all"); setNavCategory("all");
    setMinPrice(0); setMaxPrice(priceMax);
    setMinRating(0); setSort("default");
  };

  const activeFilters = [
    category !== "all"  && { key: "cat",    label: category,          clear: () => { setCategory("all"); setNavCategory("all"); } },
    minRating > 0       && { key: "rating", label: `${minRating}★+`,  clear: () => setMinRating(0) },
    minPrice > 0        && { key: "minP",   label: `From $${minPrice}`,clear: () => setMinPrice(0) },
    maxPrice < priceMax && { key: "maxP",   label: `Up to $${maxPrice}`,clear: () => setMaxPrice(priceMax) },
  ].filter(Boolean);

  // only show deals section when no filter/search is active
  const showDeals = !normalizedQuery && category === "all";

  return (
    <div className="bg-gray-50 min-h-screen">

      {/* ── hero banner ── */}
      <div className="bg-gradient-to-r from-[#1a5dc8] to-[#2874f0] text-white py-10 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <p className="text-yellow-300 text-sm font-semibold mb-2 flex items-center gap-1">
              🔥 Limited Time Offers
            </p>
            <h1 className="text-3xl md:text-4xl font-extrabold mb-3 leading-tight">
              Shop Smarter,<br />Save Bigger
            </h1>
            <p className="text-blue-200 text-sm mb-6">Free delivery on orders above $50</p>
            <button
              onClick={() => { setNavCategory("all"); setCategory("all"); }}
              className="bg-[#fb641b] hover:bg-orange-500 text-white px-8 py-3 rounded-lg font-bold text-sm transition-colors cursor-pointer shadow-lg">
              Shop Now →
            </button>
          </div>
          <div className="flex gap-3 flex-wrap justify-center">
            {[["🚚","Free Delivery"],["↩️","Easy Returns"],["🔒","Secure Pay"],["⭐","Top Brands"]].map(([icon, label]) => (
              <div key={label} className="flex flex-col items-center gap-1 bg-white/10 backdrop-blur rounded-xl px-4 py-3 text-center min-w-[76px]">
                <span className="text-2xl">{icon}</span>
                <span className="text-[10px] text-blue-100 font-medium">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── deal of the day ── */}
      {showDeals && (
        <div className="max-w-7xl mx-auto px-4 mt-6">
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">

            {/* section header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <span className="text-xl">⚡</span>
                <div>
                  <h2 className="text-base font-extrabold text-gray-900 uppercase tracking-wide">Deal of the Day</h2>
                  <p className="text-xs text-gray-400">Hurry up! Offers end at midnight</p>
                </div>
              </div>

              {/* countdown */}
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-500 font-medium hidden sm:block">Ends in</span>
                <div className="flex items-center gap-1">
                  <TimeBox value={h} label="hrs" />
                  <span className="text-gray-400 font-bold mb-3">:</span>
                  <TimeBox value={m} label="min" />
                  <span className="text-gray-400 font-bold mb-3">:</span>
                  <TimeBox value={s} label="sec" />
                </div>
              </div>
            </div>

            {/* horizontal scroll row */}
            <div className="flex gap-3 overflow-x-auto px-5 py-4 scrollbar-hide">
              {loading
                ? Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} className="w-44 shrink-0 bg-gray-100 rounded-xl h-64 animate-pulse" />
                  ))
                : deals.map((p) => <DealCard key={p.id} product={p} />)
              }
            </div>
          </div>
        </div>
      )}

      {/* ── category quick links ── */}
      {showDeals && (
        <div className="max-w-7xl mx-auto px-4 mt-5">
          <div className="bg-white rounded-xl shadow-sm px-5 py-4">
            <h2 className="text-sm font-bold text-gray-700 mb-4 uppercase tracking-wide">Shop by Category</h2>
            <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-1">
              {[
                { emoji: "📱", label: "Electronics",  slug: "smartphones"        },
                { emoji: "👗", label: "Fashion",       slug: "womens-dresses"     },
                { emoji: "🛋️", label: "Furniture",     slug: "furniture"          },
                { emoji: "💄", label: "Beauty",        slug: "beauty"             },
                { emoji: "🧸", label: "Toys",          slug: "toys"               },
                { emoji: "🛒", label: "Grocery",       slug: "groceries"          },
                { emoji: "⚽", label: "Sports",        slug: "sports-accessories" },
                { emoji: "🔌", label: "Appliances",    slug: "home-decoration"    },
              ].map(({ emoji, label, slug }) => (
                <button key={slug}
                  onClick={() => { setNavCategory(slug); setCategory(slug); }}
                  className="flex flex-col items-center gap-2 shrink-0 cursor-pointer group">
                  <div className="w-14 h-14 rounded-full bg-blue-50 group-hover:bg-[#2874f0] flex items-center justify-center text-2xl transition-colors">
                    {emoji}
                  </div>
                  <span className="text-xs text-gray-600 group-hover:text-[#2874f0] font-medium whitespace-nowrap transition-colors">
                    {label}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── main product grid ── */}
      <div className="max-w-7xl mx-auto px-4 py-6 flex gap-5">

        {/* sidebar */}
        <aside className="hidden lg:block w-60 shrink-0">
          <div className="bg-white rounded-xl shadow-sm overflow-hidden sticky top-[76px]">

            {/* header */}
            <div className="flex items-center justify-between px-4 py-3 bg-[#2874f0]">
              <div className="flex items-center gap-2 text-white font-bold text-sm">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707L13 13.414V19a1 1 0 01-.553.894l-4 2A1 1 0 017 21v-7.586L3.293 6.707A1 1 0 013 6V4z" />
                </svg>
                Filters
              </div>
              {activeFilters.length > 0 && (
                <button onClick={clearAll}
                  className="text-[10px] text-blue-200 hover:text-white underline cursor-pointer transition-colors">
                  Clear all
                </button>
              )}
            </div>

            {/* active filter chips */}
            {activeFilters.length > 0 && (
              <div className="flex flex-wrap gap-1.5 px-4 py-3 border-b border-gray-100 bg-blue-50">
                {activeFilters.map(({ key, label, clear }) => (
                  <span key={key}
                    className="flex items-center gap-1 bg-white border border-[#2874f0] text-[#2874f0] text-[10px] font-semibold px-2 py-0.5 rounded-full">
                    {label}
                    <button onClick={clear} className="hover:text-red-500 cursor-pointer leading-none">✕</button>
                  </span>
                ))}
              </div>
            )}

            <div className="p-4 flex flex-col gap-5">

              {/* category */}
              <div>
                <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2">Category</p>
                <div className="flex flex-col gap-1">
                  {categories.map((c) => {
                    const active = category === c;
                    return (
                      <button key={c}
                        onClick={() => { setCategory(c); setNavCategory(c); }}
                        className={`flex items-center justify-between w-full px-3 py-2 rounded-lg text-sm transition-all cursor-pointer text-left ${
                          active
                            ? "bg-[#2874f0] text-white font-semibold"
                            : "text-gray-600 hover:bg-blue-50 hover:text-[#2874f0]"
                        }`}>
                        <span className="capitalize">{c === "all" ? "All Categories" : c}</span>
                        {active && <span className="text-white text-xs">✓</span>}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* price range */}
              <div>
                <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-3">Price Range</p>
                <div className="flex gap-2 mb-3">
                  <div className="flex-1">
                    <label className="text-[10px] text-gray-400 mb-1 block">Min</label>
                    <input type="number" min={0} max={maxPrice - 1} value={minPrice}
                      onChange={(e) => setMinPrice(Math.min(Number(e.target.value), maxPrice - 1))}
                      className="w-full border border-gray-200 rounded-lg px-2 py-1.5 text-xs text-gray-700 focus:outline-none focus:border-[#2874f0]" />
                  </div>
                  <div className="flex-1">
                    <label className="text-[10px] text-gray-400 mb-1 block">Max</label>
                    <input type="number" min={minPrice + 1} max={priceMax} value={maxPrice}
                      onChange={(e) => setMaxPrice(Math.max(Number(e.target.value), minPrice + 1))}
                      className="w-full border border-gray-200 rounded-lg px-2 py-1.5 text-xs text-gray-700 focus:outline-none focus:border-[#2874f0]" />
                  </div>
                </div>
                <input type="range" min={0} max={priceMax} value={maxPrice}
                  onChange={(e) => setMaxPrice(Math.max(Number(e.target.value), minPrice + 1))}
                  className="w-full accent-[#2874f0] cursor-pointer" />
                <div className="flex justify-between text-[10px] text-gray-400 mt-1">
                  <span>$0</span><span>${priceMax}</span>
                </div>
              </div>

              {/* customer rating */}
              <div>
                <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2">Customer Rating</p>
                <div className="flex flex-col gap-1">
                  {[4, 3, 2, 1].map((r) => (
                    <button key={r}
                      onClick={() => setMinRating(minRating === r ? 0 : r)}
                      className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-all cursor-pointer ${
                        minRating === r
                          ? "bg-[#2874f0] text-white font-semibold"
                          : "text-gray-600 hover:bg-blue-50 hover:text-[#2874f0]"
                      }`}>
                      <span className="flex">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <svg key={i} className={`w-3 h-3 ${i < r ? "text-yellow-400" : minRating === r ? "text-blue-300" : "text-gray-300"}`}
                            fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </span>
                      <span className="text-xs">& above</span>
                    </button>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </aside>

        {/* products */}
        <div className="flex-1 min-w-0">

          {/* toolbar */}
          <div className="bg-white rounded-xl shadow-sm px-4 py-3 flex flex-wrap items-center justify-between gap-3 mb-4">
            <div className="flex items-center gap-2 flex-wrap">
              <p className="text-sm text-gray-600">
                <span className="font-semibold text-gray-800">{displayed.length}</span> results
                {normalizedQuery && <span className="text-gray-400"> for "<span className="text-gray-700">{normalizedQuery}</span>"</span>}
              </p>
              {/* mobile active chips */}
              {activeFilters.map(({ key, label, clear }) => (
                <span key={key}
                  className="lg:hidden flex items-center gap-1 bg-blue-50 border border-[#2874f0] text-[#2874f0] text-[10px] font-semibold px-2 py-0.5 rounded-full">
                  {label}
                  <button onClick={clear} className="hover:text-red-500 cursor-pointer">✕</button>
                </span>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-500">Sort:</span>
              <select value={sort} onChange={(e) => setSort(e.target.value)}
                className="border border-gray-200 rounded-lg px-3 py-1.5 text-sm text-gray-700 focus:outline-none focus:border-[#2874f0] cursor-pointer bg-white">
                {SORT_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
            </div>
          </div>

          {error && <p className="text-center text-red-500 py-10">{error}</p>}

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-3">
            {loading
              ? Array.from({ length: SKELETON_COUNT }).map((_, i) => <CardSkeleton key={i} />)
              : displayed.length === 0
                ? <p className="col-span-5 text-center text-gray-400 py-20">No products found.</p>
                : displayed.map((p) => (
                    <Card key={p.id} id={p.id} image={p.thumbnail}
                      title={p.title} price={p.price} rating={p.rating} category={p.category} />
                  ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
