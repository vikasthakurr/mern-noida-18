import { useDispatch, useSelector } from "react-redux";
import { loginStart, loginFailure, setUser, selectAuthLoading, selectAuthError } from "../store/slices/authSlice";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import axiosInstance from "../api/axiosInstance";

const validationSchema = Yup.object({
  email: Yup.string().email("Invalid email address").required("Email is required"),
  password: Yup.string().min(6, "Minimum 6 characters").required("Password is required"),
});

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const loading = useSelector(selectAuthLoading);
  const serverError = useSelector(selectAuthError);

  // redirect back to the page the user tried to visit before being sent to login
  const from = location.state?.from?.pathname || "/";

  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema,
    onSubmit: async (values) => {
      dispatch(loginStart());
      try {
        const { data } = await axiosInstance.post("/auth/login", values);
        dispatch(setUser(data.user));
        // admin goes to dashboard, everyone else goes back to where they came from
        if (data.user?.role === "admin") {
          navigate("/admin", { replace: true });
        } else {
          navigate(from, { replace: true });
        }
      } catch (err) {
        dispatch(loginFailure(err.response?.data?.message || err.message || "Login failed"));
      }
    },
  });

  // reusable field error helper
  const fieldError = (name) =>
    formik.touched[name] && formik.errors[name] ? (
      <p className="text-red-400 text-xs mt-1">{formik.errors[name]}</p>
    ) : null;

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-[#1a1a2e] mb-6 text-center">Login</h1>

        {serverError && <p className="text-red-500 text-sm mb-4 text-center">{serverError}</p>}

        <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4" noValidate>
          <div>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`w-full border rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#e94560] ${
                formik.touched.email && formik.errors.email ? "border-red-400" : "border-gray-200"
              }`}
            />
            {fieldError("email")}
          </div>

          <div>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`w-full border rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#e94560] ${
                formik.touched.password && formik.errors.password ? "border-red-400" : "border-gray-200"
              }`}
            />
            {fieldError("password")}
          </div>

          <button
            type="submit"
            disabled={loading || !formik.isValid}
            className="bg-[#e94560] hover:bg-[#c73652] text-white py-2 rounded-lg font-semibold text-sm transition-colors disabled:opacity-60 cursor-pointer"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-sm text-center text-gray-500 mt-4">
          Don't have an account?{" "}
          <Link to="/signup" className="text-[#e94560] hover:underline font-medium">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
