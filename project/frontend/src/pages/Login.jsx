import { useDispatch, useSelector } from "react-redux";
import { loginFailure, setUser, selectAuthError } from "../store/slices/authSlice";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import axiosInstance from "../api/axiosInstance";

const validationSchema = Yup.object({
  email: Yup.string().email("Invalid email address").required("Email is required"),
  password: Yup.string().min(6, "Minimum 6 characters").required("Password is required"),
});

function Login() {
  const dispatch     = useDispatch();
  const navigate     = useNavigate();
  const location     = useLocation();
  const serverError  = useSelector(selectAuthError);
  const from         = location.state?.from?.pathname || "/";

  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const { data } = await axiosInstance.post("/auth/login", values);
        dispatch(setUser(data.user));
        navigate(data.user?.role === "admin" ? "/admin" : from, { replace: true });
      } catch (err) {
        dispatch(loginFailure(err.response?.data?.message || "Login failed"));
        setSubmitting(false);
      }
    },
  });

  const fieldError = (name) =>
    formik.touched[name] && formik.errors[name]
      ? <p className="text-red-500 text-xs mt-1">{formik.errors[name]}</p>
      : null;

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* left panel */}
      <div className="hidden lg:flex flex-col justify-center bg-[#2874f0] w-[380px] shrink-0 px-12 py-16">
        <h2 className="text-3xl font-bold text-white leading-snug mb-4">
          Login<br />& get access to<br />exclusive deals
        </h2>
        <p className="text-blue-200 text-sm">Millions of products at your fingertips.</p>
      </div>

      {/* right form */}
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="bg-white shadow-md rounded w-full max-w-sm p-8">
          <h1 className="text-xl font-bold text-gray-800 mb-6">Login</h1>

          {serverError && (
            <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-2.5 rounded mb-4">
              {serverError}
            </div>
          )}

          <form onSubmit={formik.handleSubmit} className="flex flex-col gap-5" noValidate>
            <div>
              <input type="email" name="email" placeholder="Enter Email"
                value={formik.values.email}
                onChange={formik.handleChange} onBlur={formik.handleBlur}
                className={`w-full border-b-2 px-0 py-2 text-sm text-gray-800 placeholder-gray-400 focus:outline-none transition-colors ${
                  formik.touched.email && formik.errors.email ? "border-red-400" : "border-gray-300 focus:border-[#2874f0]"
                }`}
              />
              {fieldError("email")}
            </div>

            <div>
              <input type="password" name="password" placeholder="Enter Password"
                value={formik.values.password}
                onChange={formik.handleChange} onBlur={formik.handleBlur}
                className={`w-full border-b-2 px-0 py-2 text-sm text-gray-800 placeholder-gray-400 focus:outline-none transition-colors ${
                  formik.touched.password && formik.errors.password ? "border-red-400" : "border-gray-300 focus:border-[#2874f0]"
                }`}
              />
              {fieldError("password")}
            </div>

            <p className="text-xs text-gray-500">
              By continuing, you agree to ShopZone's Terms of Use and Privacy Policy.
            </p>

            <button type="submit" disabled={formik.isSubmitting}
              className="w-full bg-[#fb641b] hover:bg-orange-600 text-white py-3 rounded font-bold text-sm transition-colors disabled:opacity-60 cursor-pointer">
              {formik.isSubmitting ? "Logging in..." : "Login"}
            </button>

            <div className="flex items-center gap-3">
              <div className="flex-1 h-px bg-gray-200" />
              <span className="text-xs text-gray-400">OR</span>
              <div className="flex-1 h-px bg-gray-200" />
            </div>

            <Link to="/signup"
              className="w-full border border-[#2874f0] text-[#2874f0] py-3 rounded font-bold text-sm text-center hover:bg-blue-50 transition-colors">
              Create Account
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
