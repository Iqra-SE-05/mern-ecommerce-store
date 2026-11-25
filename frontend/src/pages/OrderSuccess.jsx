import { Link, useLocation, Navigate } from "react-router-dom";
import Navbar from "../components/Navbar";

function OrderSuccess() {
  const location = useLocation();
  const order = location.state?.order;

  // Agar koi seedha is page par aaye to Home bhej do
  if (!order) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-2xl mx-auto px-6 py-12">
        <div className="bg-white rounded-2xl shadow-sm p-8 text-center">
          <div className="w-20 h-20 mx-auto rounded-full bg-green-100 flex items-center justify-center mb-5">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="#16a34a"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-10 h-10"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>

          <h1 className="text-3xl font-bold text-gray-900">
            Thank you for your order!
          </h1>
          <p className="text-gray-500 mt-2">
            Your order has been placed successfully.
          </p>
          <p className="mt-4 inline-block bg-gray-100 text-gray-700 text-sm font-medium px-4 py-2 rounded-full">
            Order #{order._id.slice(-6).toUpperCase()}
          </p>

          <div className="text-left mt-8 border-t pt-6">
            <h2 className="font-bold text-gray-900 mb-3">Order Details</h2>

            {order.orderItems.map((item, index) => (
              <div
                key={index}
                className="flex justify-between text-sm text-gray-700 py-1"
              >
                <span>
                  {item.name} x {item.qty}
                </span>
                <span>Rs. {item.price * item.qty}</span>
              </div>
            ))}

            <div className="flex justify-between font-extrabold text-gray-900 border-t mt-3 pt-3">
              <span>Total</span>
              <span>Rs. {order.totalPrice}</span>
            </div>
          </div>

          <div className="text-left mt-6 bg-gray-50 rounded-xl p-4 text-sm text-gray-700">
            <p className="font-semibold text-gray-900 mb-1">Delivery to</p>
            <p>{order.shippingAddress.address}</p>
            <p>
              {order.shippingAddress.city} • {order.shippingAddress.phone}
            </p>
            <p className="mt-3">
              <span className="font-semibold text-gray-900">Payment: </span>
              Cash on Delivery
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 mt-8">
            <Link
              to="/orders"
              className="flex-1 py-3 rounded-full text-white font-semibold bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 hover:opacity-90 transition"
            >
              View My Orders
            </Link>
            <Link
              to="/"
              className="flex-1 py-3 rounded-full border border-gray-300 text-gray-700 font-semibold hover:bg-gray-50 transition"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderSuccess;