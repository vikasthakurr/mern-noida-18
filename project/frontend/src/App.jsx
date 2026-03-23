import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import ChatBot from "./components/ChatBot";
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
const Orders   = lazy(() => import("./pages/Orders"));

const PageLoader = () => (
  <div className="min-h-[60vh] flex items-center justify-center text-gray-400 text-sm">
    Loading...
  </div>
);

const NotFound = () => (
  <div className="min-h-[70vh] flex flex-col items-center justify-center gap-3 text-center px-4">
    <span className="text-6xl">🔍</span>
    <h1 className="text-2xl font-bold text-gray-800">Page Not Found</h1>
    <p className="text-gray-500 text-sm">The page you're looking for doesn't exist.</p>
    <a href="/" className="mt-2 text-[#2874f0] hover:underline text-sm font-medium">Go to Home</a>
  </div>
);

function App() {
  return (
    <AuthProvider>
      <SearchProvider>
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          <Suspense fallback={<PageLoader />}>
            <Routes>              {/* public */}
              <Route path="/"       element={<Home />} />
              <Route path="/login"  element={<Login />} />
              <Route path="/signup" element={<Signup />} />

              {/* protected — any logged-in user */}
              <Route path="/cart"     element={<ProtectedRoute><Cart /></ProtectedRoute>} />
              <Route path="/checkout" element={<ProtectedRoute><Checkout /></ProtectedRoute>} />
              <Route path="/profile"  element={<ProtectedRoute><Profile /></ProtectedRoute>} />
              <Route path="/orders"   element={<ProtectedRoute><Orders /></ProtectedRoute>} />

              {/* admin only */}
              <Route path="/admin" element={<ProtectedRoute allowedRoles={["admin"]}><Admin /></ProtectedRoute>} />

              {/* 404 */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
          <ChatBot />
        </div>
      </SearchProvider>
    </AuthProvider>
  );
}

export default App;
