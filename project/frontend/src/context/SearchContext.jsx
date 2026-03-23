import { createContext, useContext, useState, useMemo } from "react";

const SearchContext = createContext(null);

export function SearchProvider({ children }) {
  const [query, setQuery]       = useState("");
  const [navCategory, setNavCategory] = useState("all"); // set by Navbar category strip

  const normalizedQuery = useMemo(() => query.trim().toLowerCase(), [query]);

  return (
    <SearchContext.Provider value={{ query, setQuery, normalizedQuery, navCategory, setNavCategory }}>
      {children}
    </SearchContext.Provider>
  );
}

// throws if used outside provider — catches wiring mistakes early
export function useSearch() {
  const ctx = useContext(SearchContext);
  if (!ctx) throw new Error("useSearch must be used within a SearchProvider");
  return ctx;
}
