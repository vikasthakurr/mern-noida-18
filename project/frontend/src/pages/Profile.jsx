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
      <p className="text-red-500 text-xs mt-1">{formik.errors[name]}</p>
    ) : null;

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-4xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* left — user card */}
        <div className="bg-white rounded shadow-sm p-6 flex flex-col items-center gap-4 h-fit">
          <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-[#2874f0] bg-gray-100 flex items-center justify-center">
            {preview ? (
              <img src={preview} alt="avatar" className="w-full h-full object-cover" />
            ) : (
              <span className="text-4xl font-bold text-[#2874f0]">
                {user?.name?.charAt(0).toUpperCase()}
              </span>
            )}
          </div>
          <div className="text-center">
            <p className="font-bold text-gray-800 text-lg">{user?.name}</p>
            <p className="text-sm text-gray-500">{user?.email}</p>
            <span className="mt-2 inline-block text-xs bg-blue-100 text-[#2874f0] px-3 py-0.5 rounded-full font-semibold capitalize">
              {user?.role}
            </span>
          </div>
          <label className="text-sm text-[#2874f0] font-medium cursor-pointer hover:underline">
            Change Photo
            <input type="file" accept="image/*" className="hidden" onChange={handleAvatarChange} />
          </label>
        </div>

        {/* right — edit form */}
        <div className="lg:col-span-2 bg-white rounded shadow-sm p-6">
          <h2 className="text-lg font-bold text-gray-800 mb-1">Personal Information</h2>
          <p className="text-sm text-gray-400 mb-6">Update your profile details below</p>

          {serverMsg && (
            <div className="bg-green-50 border border-green-200 text-green-700 text-sm px-4 py-2.5 rounded mb-4">
              {serverMsg}
            </div>
          )}
          {serverError && (
            <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-2.5 rounded mb-4">
              {serverError}
            </div>
          )}

          <form onSubmit={formik.handleSubmit} className="flex flex-col gap-5" noValidate>
            <div>
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Full Name</label>
              <input
                type="text" name="name" placeholder="Full Name"
                value={formik.values.name}
                onChange={formik.handleChange} onBlur={formik.handleBlur}
                className={`mt-1 w-full border rounded px-3 py-2.5 text-sm focus:outline-none focus:border-[#2874f0] transition-colors ${
                  formik.touched.name && formik.errors.name ? "border-red-400" : "border-gray-200"
                }`}
              />
              {fieldError("name")}
            </div>

            <div>
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Email Address</label>
              <input
                type="email" name="email" placeholder="Email"
                value={formik.values.email}
                onChange={formik.handleChange} onBlur={formik.handleBlur}
                className={`mt-1 w-full border rounded px-3 py-2.5 text-sm focus:outline-none focus:border-[#2874f0] transition-colors ${
                  formik.touched.email && formik.errors.email ? "border-red-400" : "border-gray-200"
                }`}
              />
              {fieldError("email")}
            </div>

            <div>
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">New Password</label>
              <input
                type="password" name="password" placeholder="Leave blank to keep current"
                value={formik.values.password}
                onChange={formik.handleChange} onBlur={formik.handleBlur}
                className={`mt-1 w-full border rounded px-3 py-2.5 text-sm focus:outline-none focus:border-[#2874f0] transition-colors ${
                  formik.touched.password && formik.errors.password ? "border-red-400" : "border-gray-200"
                }`}
              />
              {fieldError("password")}
            </div>

            <button
              type="submit"
              disabled={formik.isSubmitting}
              className="self-start bg-[#2874f0] hover:bg-blue-700 text-white px-10 py-2.5 rounded font-bold text-sm transition-colors disabled:opacity-60 cursor-pointer">
              {formik.isSubmitting ? "Saving..." : "Save Changes"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Profile;
