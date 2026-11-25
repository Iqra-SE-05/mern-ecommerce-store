import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useCart } from "../context/CartContext";
import { API_URL } from "../config";

function Checkout() {
  const { cartItems, totalPrice, totalItems, clearCart } = useCart();
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!userInfo) {
      navigate("/login");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
        body: JSON.stringify({
          orderItems: cartItems,
          shippingAddress: { address, city, phone },
        }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.message);
        setLoading(false);
        return;
      }

      clearCart();
navigate("/order-success", { state: { order: data } });
    } catch (err) {
      setError("Server se connect nahi ho paya");
      setLoading(false);
    }
  };

  const inputClass =
    "w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-400";

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-6xl mx-auto px-6 py-10">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>

        {cartItems.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm p-12 text-center">
            <h2 className="text-xl font-semibold text-gray-900">
              Your cart is empty
            </h2>
            <Link
              to="/"
              className="inline-block mt-6 text-white font-semibold px-8 py-3 rounded-full bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 lg:grid-cols-3 gap-8"
          >
            {/* Delivery details */}
            <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-5">
                Delivery Details
              </h2>

              {error && (
                <p className="bg-red-50 text-red-600 text-sm rounded-lg px-4 py-3 mb-4">
                  {error}
                </p>
              )}

              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Full address (house, street, area)"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className={inputClass}
                  required
                />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="City"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className={inputClass}
                    required
                  />
                  <input
                    type="text"
                    placeholder="Phone number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className={inputClass}
                    required
                  />
                </div>
              </div>

              <h2 className="text-lg font-bold text-gray-900 mt-8 mb-4">
                Payment Method
              </h2>
              <div className="border-2 border-purple-500 bg-purple-50 rounded-xl px-4 py-4 flex items-center gap-3">
                <span className="w-4 h-4 rounded-full border-4 border-purple-600 bg-white"></span>
                <div>
                  <p className="font-semibold text-gray-900">
                    Cash on Delivery (COD)
                  </p>
                  <p className="text-sm text-gray-500">
                    Pay with cash when your order arrives.
                  </p>
                </div>
              </div>
            </div>

            {/* Summary */}
            <div className="bg-white rounded-2xl shadow-sm p-6 h-fit lg:sticky lg:top-24">
              <h2 className="text-lg font-bold text-gray-900 mb-4">
                Order Summary
              </h2>

              <div className="space-y-3 mb-4 max-h-60 overflow-y-auto">
                {cartItems.map((item) => (
                  <div key={item._id} className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gray-100 rounded-lg overflow-hidden shrink-0 flex items-center justify-center">
                      {item.image && (
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-contain"
                        />
                      )}
                    </div>
                    <div className="flex-1 text-sm">
                      <p className="font-medium text-gray-900 line-clamp-1">
                        {item.name}
                      </p>
                      <p className="text-gray-500">Qty: {item.qty}</p>
                    </div>
                    <p className="text-sm font-semibold">
                      Rs. {item.price * item.qty}
                    </p>
                  </div>
                ))}
              </div>

              <div className="border-t pt-4 space-y-2">
                <div className="flex justify-between text-gray-600">
                  <span>Items ({totalItems})</span>
                  <span>Rs. {totalPrice}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Delivery</span>
                  <span className="text-green-600 font-medium">Free</span>
                </div>
                <div className="flex justify-between text-lg font-extrabold text-gray-900 pt-2">
                  <span>Total</span>
                  <span>Rs. {totalPrice}</span>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="mt-6 w-full py-3 rounded-full text-white font-semibold bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 hover:opacity-90 transition disabled:opacity-50"
              >
                {loading ? "Placing order..." : "Place Order"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default Checkout;