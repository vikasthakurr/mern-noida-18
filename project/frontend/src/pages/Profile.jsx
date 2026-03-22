import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectUser, setUser } from "../store/slices/authSlice";
import { useFormik } from "formik";
import * as Yup from "yup";
import axiosInstance from "../api/axiosInstance";

const validationSchema = Yup.object({
  name: Yup.string().min(2, "Minimum 2 characters").required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().min(6, "Minimum 6 characters"),
});

function Profile() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const [serverMsg, setServerMsg] = useState(null);
  const [serverError, setServerError] = useState(null);
  const [preview, setPreview] = useState(user?.avatar || null);

  const formik = useFormik({
    initialValues: {
      name: user?.name || "",
      email: user?.email || "",
      password: "",
      avatar: null,
    },
    validationSchema,
    onSubmit: async ({ name, email, password, avatar }) => {
      setServerMsg(null);
      setServerError(null);
      try {
        const formData = new FormData();
        formData.append("name", name);
        formData.append("email", email);
        if (password) formData.append("password", password);
        if (avatar) formData.append("avatar", avatar);

        const { data } = await axiosInstance.put(`/auth/update/${user._id}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        // update redux store with fresh user data — setUser preserves the token
        dispatch(setUser(data.user));
        setServerMsg("Profile updated successfully");
      } catch (err) {
        setServerError(err.response?.data?.message || err.message || "Update failed");
      }
    },
  });

  const handleAvatarChange = (e) => {
    const file = e.currentTarget.files[0];
    formik.setFieldValue("avatar", file || null);
    setPreview(file ? URL.createObjectURL(file) : user?.avatar);
  };

  const fieldError = (name) =>
    formik.touched[name] && formik.errors[name] ? (
      <p className="text-red-400 text-xs mt-1">{formik.errors[name]}</p>
    ) : null;

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-10">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md">

        {/* avatar */}
        <div className="flex flex-col items-center gap-3 mb-6">
          <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-[#e94560] bg-gray-100 flex items-center justify-center">
            {preview ? (
              <img src={preview} alt="avatar" className="w-full h-full object-cover" />
            ) : (
              <span className="text-4xl text-gray-300">👤</span>
            )}
          </div>
          <label className="text-xs text-[#e94560] font-medium cursor-pointer hover:underline">
            Change Avatar
            <input type="file" accept="image/*" className="hidden" onChange={handleAvatarChange} />
          </label>
          <div className="text-center">
            <p className="font-semibold text-[#1a1a2e]">{user?.name}</p>
            <span className="text-xs bg-sky-100 text-sky-700 px-2 py-0.5 rounded-full font-medium capitalize">
              {user?.role}
            </span>
          </div>
        </div>

        {serverMsg && <p className="text-green-500 text-sm mb-4 text-center">{serverMsg}</p>}
        {serverError && <p className="text-red-500 text-sm mb-4 text-center">{serverError}</p>}

        <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4" noValidate>
          <div>
            <input
              type="text" name="name" placeholder="Full Name"
              value={formik.values.name}
              onChange={formik.handleChange} onBlur={formik.handleBlur}
              className={`w-full border rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#e94560] ${formik.touched.name && formik.errors.name ? "border-red-400" : "border-gray-200"}`}
            />
            {fieldError("name")}
          </div>

          <div>
            <input
              type="email" name="email" placeholder="Email"
              value={formik.values.email}
              onChange={formik.handleChange} onBlur={formik.handleBlur}
              className={`w-full border rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#e94560] ${formik.touched.email && formik.errors.email ? "border-red-400" : "border-gray-200"}`}
            />
            {fieldError("email")}
          </div>

          <div>
            <input
              type="password" name="password" placeholder="New Password (optional)"
              value={formik.values.password}
              onChange={formik.handleChange} onBlur={formik.handleBlur}
              className={`w-full border rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#e94560] ${formik.touched.password && formik.errors.password ? "border-red-400" : "border-gray-200"}`}
            />
            {fieldError("password")}
          </div>

          <button
            type="submit"
            disabled={formik.isSubmitting}
            className="bg-[#e94560] hover:bg-[#c73652] text-white py-2 rounded-lg font-semibold text-sm transition-colors disabled:opacity-60 cursor-pointer"
          >
            {formik.isSubmitting ? "Saving..." : "Save Changes"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Profile;
