import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { API_URL } from "../config";

const steps = ["Pending", "Shipped", "Delivered"];

function Tracker({ status }) {
  const current = steps.indexOf(status);

  return (
    <div className="flex items-center mt-4 mb-2">
      {steps.map((step, index) => {
        const done = index <= current;
        return (
          <div key={step} className="flex items-center flex-1 last:flex-none">
            <div className="flex flex-col items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white ${
                  done
                    ? "bg-gradient-to-br from-purple-600 to-pink-500"
                    : "bg-gray-300"
                }`}
              >
                {done ? "✓" : index + 1}
              </div>
              <span
                className={`text-xs mt-1 ${
                  done ? "text-gray-900 font-semibold" : "text-gray-400"
                }`}
              >
                {step}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div
                className={`flex-1 h-1 mx-2 mb-5 rounded ${
                  index < current ? "bg-pink-500" : "bg-gray-200"
                }`}
              ></div>
            )}
          </div>
        );
      })}
    </div>
  );
}

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
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-4xl mx-auto px-6 py-10">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">My Orders</h1>

        {loading ? (
          <p className="text-gray-600">Loading...</p>
        ) : orders.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm p-12 text-center">
            <h2 className="text-xl font-semibold text-gray-900">
              You have no orders yet
            </h2>
            <Link
              to="/"
              className="inline-block mt-6 text-white font-semibold px-8 py-3 rounded-full bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          orders.map((order) => (
            <div
              key={order._id}
              className="bg-white rounded-2xl shadow-sm p-6 mb-5"
            >
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-bold text-gray-900">
                    Order #{order._id.slice(-6).toUpperCase()}
                  </p>
                  <p className="text-xs text-gray-500">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <span className="text-xs font-semibold bg-purple-100 text-purple-700 px-3 py-1 rounded-full">
                  {order.status}
                </span>
              </div>

              <Tracker status={order.status} />

              <div className="border-t mt-4 pt-4">
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
              </div>

              <div className="border-t mt-3 pt-3 flex justify-between items-center">
                <span className="text-xs text-gray-500">
                  Payment: {order.paymentMethod || "COD"}
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

export default Orders;