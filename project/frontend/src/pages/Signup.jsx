import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import axiosInstance from "../api/axiosInstance";

const ROLES = ["user", "admin", "moderator"];

const validationSchema = Yup.object({
  name: Yup.string().min(2, "Minimum 2 characters").required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().min(6, "Minimum 6 characters").required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords do not match")
    .required("Please confirm your password"),
  role: Yup.string().oneOf(ROLES).required("Role is required"),
  avatar: Yup.mixed().nullable(),
});

function Signup() {
  const navigate = useNavigate();
  const [serverError, setServerError] = useState(null);
  const [preview, setPreview] = useState(null);

  const formik = useFormik({
    initialValues: {
      name: "", email: "", password: "", confirmPassword: "",
      role: "user", avatar: null,
    },
    validationSchema,
    onSubmit: async ({ name, email, password, role, avatar }) => {
      setServerError(null);
      try {
        // avatar upload requires multipart/form-data
        const formData = new FormData();
        formData.append("name", name);
        formData.append("email", email);
        formData.append("password", password);
        formData.append("role", role);
        if (avatar) formData.append("avatar", avatar);

        await axiosInstance.post("/auth/register", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        navigate("/login");
      } catch (err) {
        setServerError(err.response?.data?.message || err.message || "Registration failed");
      }
    },
  });

  const handleAvatarChange = (e) => {
    const file = e.currentTarget.files[0];
    formik.setFieldValue("avatar", file || null);
    setPreview(file ? URL.createObjectURL(file) : null);
  };

  const fieldError = (name) =>
    formik.touched[name] && formik.errors[name] ? (
      <p className="text-red-400 text-xs mt-1">{formik.errors[name]}</p>
    ) : null;

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-10">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-[#1a1a2e] mb-6 text-center">Create Account</h1>

        {serverError && <p className="text-red-500 text-sm mb-4 text-center">{serverError}</p>}

        <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4" noValidate>

          {/* avatar upload */}
          <div className="flex flex-col items-center gap-2">
            <div className="w-20 h-20 rounded-full bg-gray-100 overflow-hidden border-2 border-dashed border-gray-300 flex items-center justify-center">
              {preview
                ? <img src={preview} alt="avatar preview" className="w-full h-full object-cover" />
                : <span className="text-3xl text-gray-300">👤</span>
              }
            </div>
            <label className="text-xs text-[#e94560] font-medium cursor-pointer hover:underline">
              Upload Avatar
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleAvatarChange}
              />
            </label>
          </div>

          {/* name */}
          <div>
            <input
              type="text" name="name" placeholder="Full Name"
              value={formik.values.name}
              onChange={formik.handleChange} onBlur={formik.handleBlur}
              className={`w-full border rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#e94560] ${formik.touched.name && formik.errors.name ? "border-red-400" : "border-gray-200"}`}
            />
            {fieldError("name")}
          </div>

          {/* email */}
          <div>
            <input
              type="email" name="email" placeholder="Email"
              value={formik.values.email}
              onChange={formik.handleChange} onBlur={formik.handleBlur}
              className={`w-full border rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#e94560] ${formik.touched.email && formik.errors.email ? "border-red-400" : "border-gray-200"}`}
            />
            {fieldError("email")}
          </div>

          {/* password */}
          <div>
            <input
              type="password" name="password" placeholder="Password"
              value={formik.values.password}
              onChange={formik.handleChange} onBlur={formik.handleBlur}
              className={`w-full border rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#e94560] ${formik.touched.password && formik.errors.password ? "border-red-400" : "border-gray-200"}`}
            />
            {fieldError("password")}
          </div>

          {/* confirm password */}
          <div>
            <input
              type="password" name="confirmPassword" placeholder="Confirm Password"
              value={formik.values.confirmPassword}
              onChange={formik.handleChange} onBlur={formik.handleBlur}
              className={`w-full border rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#e94560] ${formik.touched.confirmPassword && formik.errors.confirmPassword ? "border-red-400" : "border-gray-200"}`}
            />
            {fieldError("confirmPassword")}
          </div>

          {/* role */}
          <div>
            <select
              name="role"
              value={formik.values.role}
              onChange={formik.handleChange} onBlur={formik.handleBlur}
              className="w-full border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#e94560] cursor-pointer"
            >
              {ROLES.map((r) => (
                <option key={r} value={r}>{r.charAt(0).toUpperCase() + r.slice(1)}</option>
              ))}
            </select>
            {fieldError("role")}
          </div>

          <button
            type="submit"
            disabled={formik.isSubmitting || !formik.isValid}
            className="bg-[#e94560] hover:bg-[#c73652] text-white py-2 rounded-lg font-semibold text-sm transition-colors disabled:opacity-60 cursor-pointer"
          >
            {formik.isSubmitting ? "Creating account..." : "Sign Up"}
          </button>
        </form>

        <p className="text-sm text-center text-gray-500 mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-[#e94560] hover:underline font-medium">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
