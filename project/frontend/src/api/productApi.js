const BASE_URL = "https://dummyjson.com";

export const fetchProducts = async (limit = 20) => {
  const res = await fetch(`${BASE_URL}/products?limit=${limit}`);
  if (!res.ok) throw new Error("Failed to fetch products");
  const data = await res.json();
  return data.products;
};
