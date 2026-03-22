import { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadProducts } from "../store/slices/productSlice";
import { useSearch } from "../context/SearchContext";
import Card from "../components/Card";
import CardSkeleton from "../components/CardSkeleton";

const SKELETON_COUNT = 20;

const SORT_OPTIONS = [
  { label: "Default",        value: "default" },
  { label: "Price: Low → High", value: "price_asc" },
  { label: "Price: High → Low", value: "price_desc" },
  { label: "Rating",         value: "rating" },
  { label: "Name: A → Z",   value: "name_asc" },
];

function Home() {
  const dispatch = useDispatch();
  const { items: products, loading, error } = useSelector((state) => state.products);

  const [sort, setSort]           = useState("default");
  const [category, setCategory]   = useState("all");
  const [maxPrice, setMaxPrice]   = useState(1000);

  const { normalizedQuery } = useSearch();

  useEffect(() => {
    if (products.length === 0) dispatch(loadProducts(100));
  }, [dispatch, products.length]);

  // derive unique categories from loaded products
  const categories = useMemo(() => {
    const cats = [...new Set(products.map((p) => p.category))];
    return ["all", ...cats.sort()];
  }, [products]);

  // max possible price for the slider ceiling
  const priceMax = useMemo(
    () => Math.ceil(Math.max(...products.map((p) => p.price), 1000)),
    [products]
  );

  // filter → sort pipeline, recomputed only when deps change
  const displayed = useMemo(() => {
    let result = [...products];

    // filter by search query
    if (normalizedQuery) {
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(normalizedQuery) ||
          p.category.toLowerCase().includes(normalizedQuery)
      );
    }

    // filter by category
    if (category !== "all") result = result.filter((p) => p.category === category);

    // filter by max price
    result = result.filter((p) => p.price <= maxPrice);

    // sort
    switch (sort) {
      case "price_asc":  result.sort((a, b) => a.price - b.price);           break;
      case "price_desc": result.sort((a, b) => b.price - a.price);           break;
      case "rating":     result.sort((a, b) => b.rating - a.rating);         break;
      case "name_asc":   result.sort((a, b) => a.title.localeCompare(b.title)); break;
      default: break;
    }

    return result;
  }, [products, category, maxPrice, sort, normalizedQuery]);

  return (
    <main>
      {/* hero */}
      <section className="bg-[#1a1a2e] text-white py-20 px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Welcome to <span className="text-[#e94560]">ShopZone</span>
        </h1>
        <p className="text-gray-400 text-lg max-w-xl mx-auto">
          Discover the best products at unbeatable prices
        </p>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-10">

        {/* filter + sort bar */}
        <div className="flex flex-wrap items-end gap-4 mb-8 bg-white p-4 rounded-xl shadow-sm">

          {/* category filter */}
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="border border-gray-200 rounded-lg px-3 py-2 text-sm text-[#1a1a2e] focus:outline-none focus:ring-2 focus:ring-[#e94560] cursor-pointer"
            >
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c === "all" ? "All Categories" : c}
                </option>
              ))}
            </select>
          </div>

          {/* price range */}
          <div className="flex flex-col gap-1 min-w-[180px]">
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
              Max Price: <span className="text-[#e94560]">${maxPrice}</span>
            </label>
            <input
              type="range"
              min={1}
              max={priceMax}
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="accent-[#e94560] cursor-pointer"
            />
          </div>

          {/* sort */}
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Sort By</label>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="border border-gray-200 rounded-lg px-3 py-2 text-sm text-[#1a1a2e] focus:outline-none focus:ring-2 focus:ring-[#e94560] cursor-pointer"
            >
              {SORT_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
          </div>

          {/* result count + reset */}
          <div className="ml-auto flex items-center gap-4">
            <span className="text-sm text-gray-400">{displayed.length} products</span>
            <button
              onClick={() => { setSort("default"); setCategory("all"); setMaxPrice(priceMax); }}
              className="text-xs text-[#e94560] hover:underline cursor-pointer font-medium"
            >
              Reset
            </button>
          </div>
        </div>

        {error && <p className="text-center text-red-500 py-20">Error: {error}</p>}

        {/* grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {loading
            ? Array.from({ length: SKELETON_COUNT }).map((_, i) => <CardSkeleton key={i} />)
            : displayed.length === 0
              ? <p className="col-span-4 text-center text-gray-400 py-20">No products match your filters.</p>
              : displayed.map((product) => (
                  <Card
                    key={product.id}
                    id={product.id}
                    image={product.thumbnail}
                    title={product.title}
                    price={product.price}
                    rating={product.rating}
                    category={product.category}
                  />
                ))}
        </div>
      </section>
    </main>
  );
}

export default Home;
