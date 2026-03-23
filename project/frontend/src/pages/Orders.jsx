import { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";
import { Link } from "react-router-dom";

const STATUS_COLORS = {
  pending:    "bg-yellow-100 text-yellow-700",
  processing: "bg-blue-100 text-blue-700",
  shipped:    "bg-purple-100 text-purple-700",
  delivered:  "bg-green-100 text-green-700",
  cancelled:  "bg-red-100 text-red-600",
};

function Orders() {
  const [orders, setOrders]   = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(null);

  useEffect(() => {
    axiosInstance
      .get("/orders/myorders")
      .then(({ data }) => setOrders(data.orders || []))
      .catch((err) => setError(err.response?.data?.message || "Failed to load orders"))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center bg-gray-50">
        <div className="w-10 h-10 border-4 border-[#2874f0] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center bg-gray-50">
        <p className="text-red-500 text-sm">{error}</p>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4 bg-gray-50">
        <div className="bg-white rounded shadow-sm p-12 flex flex-col items-center gap-4">
          <span className="text-6xl">📦</span>
          <p className="text-lg font-semibold text-gray-700">No orders yet!</p>
          <p className="text-sm text-gray-400">Start shopping to see your orders here.</p>
          <Link to="/" className="mt-2 bg-[#2874f0] hover:bg-blue-700 text-white px-10 py-2.5 rounded font-bold text-sm transition-colors">
            Shop Now
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-xl font-bold text-gray-800 mb-6">My Orders</h1>
        <div className="flex flex-col gap-4">
          {orders.map((order) => (
            <div key={order._id} className="bg-white rounded shadow-sm p-5">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <p className="text-xs text-gray-400">Order ID</p>
                  <p className="text-sm font-mono text-gray-700">{order._id}</p>
                </div>
                <span className={`text-xs font-semibold px-3 py-1 rounded-full capitalize ${
                  STATUS_COLORS[order.status] || "bg-gray-100 text-gray-600"
                }`}>
                  {order.status}
                </span>
              </div>

              <div className="flex flex-col gap-2">
                {(order.orderItems || []).map((item, i) => (
                  <div key={i} className="flex items-center gap-3 py-2 border-b last:border-0">
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-800">{item.name}</p>
                      <p className="text-xs text-gray-500">Qty: {item.qty}</p>
                    </div>
                    <p className="text-sm font-bold text-gray-800">
                      ${(item.price * item.qty).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>

              <div className="flex justify-between items-center mt-3 pt-3 border-t">
                <p className="text-xs text-gray-400">
                  {order.createdAt ? new Date(order.createdAt).toLocaleDateString() : ""}
                </p>
                <p className="text-sm font-bold text-gray-900">
                  Total: ${(order.totalPrice || 0).toFixed(2)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Orders;
