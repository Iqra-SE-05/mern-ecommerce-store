import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { API_URL } from "../config";

const statusColors = {
  Pending: "bg-yellow-100 text-yellow-700",
  Shipped: "bg-blue-100 text-blue-700",
  Delivered: "bg-green-100 text-green-700",
};

function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  const loadOrders = () => {
    fetch(`${API_URL}/api/orders`, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        setOrders(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => {
    if (!userInfo || userInfo.role !== "admin") {
      navigate("/");
      return;
    }
    loadOrders();
    // eslint-disable-next-line
  }, []);

  const changeStatus = async (id, status) => {
    await fetch(`${API_URL}/api/orders/${id}/status`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
      body: JSON.stringify({ status }),
    });
    loadOrders();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-5xl mx-auto px-6 py-10">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Manage Orders
        </h1>

        {loading ? (
          <p className="text-gray-600">Loading...</p>
        ) : orders.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm p-10 text-center text-gray-600">
            No orders yet.
          </div>
        ) : (
          orders.map((order) => (
            <div
              key={order._id}
              className="bg-white rounded-2xl shadow-sm p-5 mb-4"
            >
              <div className="flex flex-wrap justify-between items-start gap-3">
                <div>
                  <p className="font-bold text-gray-900">
                    Order #{order._id.slice(-6).toUpperCase()}
                  </p>
                  <p className="text-sm text-gray-600">
                    {order.user?.name || "Deleted user"}
                    {order.user?.email ? ` • ${order.user.email}` : ""}
                  </p>
                  <p className="text-xs text-gray-500">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <span
                    className={`text-xs font-semibold px-3 py-1 rounded-full ${
                      statusColors[order.status]
                    }`}
                  >
                    {order.status}
                  </span>
                  <select
                    value={order.status}
                    onChange={(e) => changeStatus(order._id, e.target.value)}
                    className="border border-gray-300 rounded-lg px-3 py-1.5 text-sm bg-white"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                  </select>
                </div>
              </div>

              <div className="border-t mt-4 pt-3">
                {order.orderItems.map((item, index) => (
                  <div
                    key={index}
                    className="flex justify-between text-sm text-gray-800 py-0.5"
                  >
                    <span>
                      {item.name} x {item.qty}
                    </span>
                    <span>Rs. {item.price * item.qty}</span>
                  </div>
                ))}
              </div>

              <div className="border-t mt-3 pt-3 text-sm text-gray-600 flex flex-wrap justify-between gap-2">
                <span>
                  {order.shippingAddress.address}, {order.shippingAddress.city}{" "}
                  • {order.shippingAddress.phone}
                </span>
                <span className="font-extrabold text-gray-900">
                  Total: Rs. {order.totalPrice}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default AdminOrders;