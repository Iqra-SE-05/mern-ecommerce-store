import { useState } from "react";
import { API_URL } from "../config";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useCart } from "../context/CartContext";

function Checkout() {
  const { cartItems, totalPrice, clearCart } = useCart();
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!userInfo) {
      navigate("/login");
      return;
    }

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
        return;
      }

      clearCart();
      navigate("/orders");
    } catch (err) {
      setError("Server se connect nahi ho paya");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="max-w-xl mx-auto p-8">
        <h2 className="text-xl font-semibold mb-6 text-gray-800">Checkout</h2>

        {cartItems.length === 0 ? (
          <p className="text-gray-600">Your cart is empty.</p>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="bg-white p-6 rounded-xl shadow"
          >
            {error && <p className="text-red-600 text-sm mb-4">{error}</p>}

            <input
              type="text"
              placeholder="Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 mb-4"
              required
            />
            <input
              type="text"
              placeholder="City"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 mb-4"
              required
            />
            <input
              type="text"
              placeholder="Phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 mb-4"
              required
            />

            <p className="font-bold text-gray-900 mb-4">
              Total: Rs. {totalPrice}
            </p>

            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700"
            >
              Place Order
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default Checkout;