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
  role: Yup.string().oneOf(ROLES).required(),
  avatar: Yup.mixed().nullable(),
});

function Signup() {
  const navigate = useNavigate();
  const [serverError, setServerError] = useState(null);
  const [preview, setPreview] = useState(null);

  const formik = useFormik({
    initialValues: { name: "", email: "", password: "", confirmPassword: "", role: "user", avatar: null },
    validationSchema,
    onSubmit: async ({ name, email, password, role, avatar }) => {
      setServerError(null);
      try {
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
        setServerError(err.response?.data?.message || "Registration failed");
      }
    },
  });

  const handleAvatarChange = (e) => {
    const file = e.currentTarget.files[0];
    formik.setFieldValue("avatar", file || null);
    setPreview(file ? URL.createObjectURL(file) : null);
  };

  const field = (name, type = "text", placeholder) => (
    <div>
      <input type={type} name={name} placeholder={placeholder}
        value={formik.values[name]}
        onChange={formik.handleChange} onBlur={formik.handleBlur}
        className={`w-full border-b-2 px-0 py-2 text-sm text-gray-800 placeholder-gray-400 focus:outline-none transition-colors ${
          formik.touched[name] && formik.errors[name] ? "border-red-400" : "border-gray-300 focus:border-[#2874f0]"
        }`}
      />
      {formik.touched[name] && formik.errors[name] && (
        <p className="text-red-500 text-xs mt-1">{formik.errors[name]}</p>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* left panel */}
      <div className="hidden lg:flex flex-col justify-center bg-[#2874f0] w-[380px] shrink-0 px-12 py-16">
        <h2 className="text-3xl font-bold text-white leading-snug mb-4">
          Looks like<br />you're new here!
        </h2>
        <p className="text-blue-200 text-sm">Sign up with your details to get started.</p>
      </div>

      {/* right form */}
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="bg-white shadow-md rounded w-full max-w-sm p-8">
          <h1 className="text-xl font-bold text-gray-800 mb-6">Create Account</h1>

          {serverError && (
            <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-2.5 rounded mb-4">
              {serverError}
            </div>
          )}

          <form onSubmit={formik.handleSubmit} className="flex flex-col gap-5" noValidate>

            {/* avatar */}
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-gray-100 border-2 border-dashed border-gray-300 overflow-hidden flex items-center justify-center shrink-0">
                {preview
                  ? <img src={preview} alt="preview" className="w-full h-full object-cover" />
                  : <span className="text-2xl text-gray-300">👤</span>
                }
              </div>
              <label className="text-sm text-[#2874f0] font-medium cursor-pointer hover:underline">
                Upload Photo
                <input type="file" accept="image/*" className="hidden" onChange={handleAvatarChange} />
              </label>
            </div>

            {field("name",            "text",     "Full Name")}
            {field("email",           "email",    "Email")}
            {field("password",        "password", "Password")}
            {field("confirmPassword", "password", "Confirm Password")}

            {/* role */}
            <div>
              <select name="role" value={formik.values.role}
                onChange={formik.handleChange} onBlur={formik.handleBlur}
                className="w-full border-b-2 border-gray-300 focus:border-[#2874f0] py-2 text-sm text-gray-700 focus:outline-none cursor-pointer bg-transparent">
                {ROLES.map((r) => <option key={r} value={r}>{r.charAt(0).toUpperCase() + r.slice(1)}</option>)}
              </select>
            </div>

            <p className="text-xs text-gray-500">
              By continuing, you agree to ShopZone's Terms of Use and Privacy Policy.
            </p>

            <button type="submit" disabled={formik.isSubmitting || !formik.isValid}
              className="w-full bg-[#fb641b] hover:bg-orange-600 text-white py-3 rounded font-bold text-sm transition-colors disabled:opacity-60 cursor-pointer">
              {formik.isSubmitting ? "Creating account..." : "Continue"}
            </button>

            <div className="flex items-center gap-3">
              <div className="flex-1 h-px bg-gray-200" />
              <span className="text-xs text-gray-400">Existing user?</span>
              <div className="flex-1 h-px bg-gray-200" />
            </div>

            <Link to="/login"
              className="w-full border border-[#2874f0] text-[#2874f0] py-3 rounded font-bold text-sm text-center hover:bg-blue-50 transition-colors">
              Login
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup;
