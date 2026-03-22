import { createContext, useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectUser, selectIsLoggedIn, logout } from "../store/slices/authSlice";

// AuthContext bridges Redux auth state into React context
// so any component can call useAuth() without importing Redux directly
const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const isLoggedIn = useSelector(selectIsLoggedIn);

  const handleLogout = () => dispatch(logout());

  return (
    <AuthContext.Provider value={{ user, isLoggedIn, logout: handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
}
