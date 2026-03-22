import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import { SearchProvider } from "./context/SearchContext";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

const Home     = lazy(() => import("./pages/Home"));
const Cart     = lazy(() => import("./pages/Cart"));
const Checkout = lazy(() => import("./pages/Checkout"));
const Login    = lazy(() => import("./pages/Login"));
const Signup   = lazy(() => import("./pages/Signup"));
const Admin    = lazy(() => import("./pages/Admin"));
const Profile  = lazy(() => import("./pages/Profile"));

const PageLoader = () => (
  <div className="min-h-[60vh] flex items-center justify-center text-gray-400 text-sm">
    Loading...
  </div>
);

function App() {
  return (
    <AuthProvider>
      <SearchProvider>
        <div className="min-h-screen bg-gray-100">
          <Navbar />
          <Suspense fallback={<PageLoader />}>
            <Routes>
              {/* public routes */}
              <Route path="/"       element={<Home />} />
              <Route path="/login"  element={<Login />} />
              <Route path="/signup" element={<Signup />} />

              {/* protected — any logged-in user */}
              <Route path="/cart" element={
                <ProtectedRoute><Cart /></ProtectedRoute>
              } />
              <Route path="/checkout" element={
                <ProtectedRoute><Checkout /></ProtectedRoute>
              } />
              <Route path="/profile" element={
                <ProtectedRoute><Profile /></ProtectedRoute>
              } />

              {/* protected — admin only */}
              <Route path="/admin" element={
                <ProtectedRoute allowedRoles={["admin"]}><Admin /></ProtectedRoute>
              } />
            </Routes>
          </Suspense>
        </div>
      </SearchProvider>
    </AuthProvider>
  );
}

export default App;
