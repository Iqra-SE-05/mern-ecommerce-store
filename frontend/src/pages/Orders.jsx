import { useEffect, useState } from "react";
import { API_URL } from "../config";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));

    if (!userInfo) {
      navigate("/login");
      return;
    }

   fetch(`${API_URL}/api/orders/myorders`, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        setOrders(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="max-w-4xl mx-auto p-8">
        <h2 className="text-xl font-semibold mb-6 text-gray-800">
          My Orders
        </h2>

        {loading ? (
          <p className="text-gray-600">Loading...</p>
        ) : orders.length === 0 ? (
          <div className="bg-white p-6 rounded-xl shadow">
            <p className="text-gray-600">You have no orders yet.</p>
          </div>
        ) : (
          orders.map((order) => (
            <div key={order._id} className="bg-white p-5 rounded-xl shadow mb-4">
              <div className="flex justify-between items-center mb-3">
                <span className="text-xs text-gray-500">
                  Order #{order._id.slice(-6)} •{" "}
                  {new Date(order.createdAt).toLocaleDateString()}
                </span>
                <span className="text-xs bg-indigo-100 text-indigo-700 px-2 py-1 rounded-full">
                  {order.status}
                </span>
              </div>

              {order.orderItems.map((item, index) => (
                <div
                  key={index}
                  className="flex justify-between text-sm text-gray-800 py-1"
                >
                  <span>
                    {item.name} x {item.qty}
                  </span>
                  <span>Rs. {item.price * item.qty}</span>
                </div>
              ))}

              <p className="text-xs text-gray-500 mt-2">
  Payment: {order.paymentMethod || "COD"}
</p>
              <div className="border-t mt-3 pt-3 flex justify-between font-bold text-gray-900">
                <span>Total</span>
                <span>Rs. {order.totalPrice}</span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Orders;