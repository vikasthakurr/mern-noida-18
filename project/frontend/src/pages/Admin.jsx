import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../store/slices/authSlice";
import axiosInstance from "../api/axiosInstance";

const STATUS_COLORS = {
  pending:    "bg-yellow-100 text-yellow-700",
  processing: "bg-blue-100 text-blue-700",
  shipped:    "bg-purple-100 text-purple-700",
  delivered:  "bg-green-100 text-green-700",
  cancelled:  "bg-red-100 text-red-600",
};

const ROLE_COLORS = {
  admin:     "bg-red-100 text-red-600",
  moderator: "bg-purple-100 text-purple-700",
  user:      "bg-green-100 text-green-700",
};

const TABS = ["Orders", "Users"];

function StatCard({ icon, label, value, color }) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-5 flex items-center gap-4">
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl ${color}`}>
        {icon}
      </div>
      <div>
        <p className="text-2xl font-bold text-gray-800">{value}</p>
        <p className="text-xs text-gray-500 mt-0.5">{label}</p>
      </div>
    </div>
  );
}

function Admin() {
  const admin = useSelector(selectUser);

  const [orders, setOrders]         = useState([]);
  const [users, setUsers]           = useState([]);
  const [loadingOrders, setLO]      = useState(true);
  const [loadingUsers, setLU]       = useState(true);
  const [activeTab, setActiveTab]   = useState("Orders");
  const [updatingId, setUpdatingId] = useState(null);

  useEffect(() => {
    axiosInstance.get("/orders")
      .then(({ data }) => setOrders(data.orders || []))
      .finally(() => setLO(false));

    axiosInstance.get("/auth/allusers")
      .then(({ data }) => setUsers(Array.isArray(data) ? data : []))
      .finally(() => setLU(false));
  }, []);

  const revenue = orders.reduce((sum, o) => sum + (o.totalPrice || 0), 0);

  const handleStatusChange = async (orderId, status) => {
    setUpdatingId(orderId);
    try {
      const { data } = await axiosInstance.put(`/orders/${orderId}/status`, { status });
      setOrders((prev) => prev.map((o) => o._id === orderId ? data.order : o));
    } catch (err) {
      console.error("Status update failed:", err.response?.data || err.message);
    } finally {
      setUpdatingId(null);
    }
  };

  const handleDeleteUser = async (userId) => {
    if (!window.confirm("Delete this user?")) return;
    try {
      await axiosInstance.delete(`/auth/delete/${userId}`);
      setUsers((prev) => prev.filter((u) => u._id !== userId));
    } catch (err) {
      console.error("Delete failed:", err.response?.data || err.message);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4">

        {/* header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard</h1>
          <p className="text-sm text-gray-500 mt-1">Welcome back, {admin?.name} 👋</p>
        </div>

        {/* stat cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard icon="📦" label="Total Orders"  value={loadingOrders ? "…" : orders.length}          color="bg-blue-50 text-blue-600"   />
          <StatCard icon="👥" label="Total Users"   value={loadingUsers  ? "…" : users.length}           color="bg-green-50 text-green-600"  />
          <StatCard icon="💰" label="Revenue"       value={loadingOrders ? "…" : `$${revenue.toFixed(2)}`} color="bg-yellow-50 text-yellow-600" />
          <StatCard icon="🔄" label="Pending"       value={loadingOrders ? "…" : orders.filter(o => o.status === "pending").length} color="bg-orange-50 text-orange-600" />
        </div>

        {/* tabs */}
        <div className="flex gap-1 bg-white rounded-xl shadow-sm p-1 w-fit mb-6">
          {TABS.map((tab) => (
            <button key={tab} onClick={() => setActiveTab(tab)}
              className={`px-6 py-2 rounded-lg text-sm font-semibold transition-colors cursor-pointer ${
                activeTab === tab
                  ? "bg-[#2874f0] text-white"
                  : "text-gray-500 hover:text-gray-800"
              }`}>
              {tab}
            </button>
          ))}
        </div>

        {/* orders table */}
        {activeTab === "Orders" && (
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b">
              <h2 className="text-base font-bold text-gray-800">
                All Orders <span className="text-gray-400 font-normal text-sm">({orders.length})</span>
              </h2>
            </div>

            {loadingOrders ? (
              <div className="flex items-center justify-center py-16">
                <div className="w-8 h-8 border-4 border-[#2874f0] border-t-transparent rounded-full animate-spin" />
              </div>
            ) : orders.length === 0 ? (
              <p className="text-center text-gray-400 py-16 text-sm">No orders yet.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-gray-50 text-left text-xs text-gray-500 uppercase tracking-wide">
                      <th className="px-6 py-3">Order ID</th>
                      <th className="px-6 py-3">Customer</th>
                      <th className="px-6 py-3">Items</th>
                      <th className="px-6 py-3">Amount</th>
                      <th className="px-6 py-3">Status</th>
                      <th className="px-6 py-3">Date</th>
                      <th className="px-6 py-3">Update</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {orders.map((order) => (
                      <tr key={order._id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 font-mono text-xs text-[#2874f0]">
                          {order._id.slice(-8).toUpperCase()}
                        </td>
                        <td className="px-6 py-4">
                          <p className="font-medium text-gray-800">{order.user?.name || "—"}</p>
                          <p className="text-xs text-gray-400">{order.user?.email || ""}</p>
                        </td>
                        <td className="px-6 py-4 text-gray-600">
                          {order.orderItems?.length} item{order.orderItems?.length !== 1 ? "s" : ""}
                        </td>
                        <td className="px-6 py-4 font-semibold text-gray-800">
                          ${(order.totalPrice || 0).toFixed(2)}
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-2.5 py-1 rounded-full text-xs font-semibold capitalize ${
                            STATUS_COLORS[order.status] || "bg-gray-100 text-gray-600"
                          }`}>
                            {order.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-gray-400 text-xs">
                          {new Date(order.createdAt).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4">
                          <select
                            value={order.status}
                            disabled={updatingId === order._id}
                            onChange={(e) => handleStatusChange(order._id, e.target.value)}
                            className="border border-gray-200 rounded px-2 py-1 text-xs text-gray-700 focus:outline-none focus:border-[#2874f0] cursor-pointer disabled:opacity-50"
                          >
                            {["pending","processing","shipped","delivered","cancelled"].map((s) => (
                              <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
                            ))}
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* users table */}
        {activeTab === "Users" && (
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b">
              <h2 className="text-base font-bold text-gray-800">
                All Users <span className="text-gray-400 font-normal text-sm">({users.length})</span>
              </h2>
            </div>

            {loadingUsers ? (
              <div className="flex items-center justify-center py-16">
                <div className="w-8 h-8 border-4 border-[#2874f0] border-t-transparent rounded-full animate-spin" />
              </div>
            ) : users.length === 0 ? (
              <p className="text-center text-gray-400 py-16 text-sm">No users found.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-gray-50 text-left text-xs text-gray-500 uppercase tracking-wide">
                      <th className="px-6 py-3">User</th>
                      <th className="px-6 py-3">Email</th>
                      <th className="px-6 py-3">Role</th>
                      <th className="px-6 py-3">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {users.map((u) => (
                      <tr key={u._id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-[#2874f0] flex items-center justify-center text-white text-xs font-bold shrink-0">
                              {u.avatar
                                ? <img src={u.avatar} alt="" className="w-full h-full rounded-full object-cover" />
                                : u.name?.charAt(0).toUpperCase()
                              }
                            </div>
                            <span className="font-medium text-gray-800">{u.name}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-gray-500">{u.email}</td>
                        <td className="px-6 py-4">
                          <span className={`px-2.5 py-1 rounded-full text-xs font-semibold capitalize ${
                            ROLE_COLORS[u.role] || "bg-gray-100 text-gray-600"
                          }`}>
                            {u.role}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          {u._id !== admin?._id && (
                            <button
                              onClick={() => handleDeleteUser(u._id)}
                              className="text-xs text-red-500 hover:text-red-700 hover:underline cursor-pointer transition-colors"
                            >
                              Delete
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}

export default Admin;
