import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useCart } from "../context/CartContext";

function Cart() {
  const { cartItems, removeFromCart, updateQty, totalPrice, totalItems } =
    useCart();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-6xl mx-auto px-6 py-10">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Shopping Cart
        </h1>

        {cartItems.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm p-12 text-center">
            <p className="text-5xl mb-4">🛒</p>
            <h2 className="text-xl font-semibold text-gray-900">
              Your cart is empty
            </h2>
            <p className="text-gray-500 mt-2 mb-6">
              Looks like you have not added anything yet.
            </p>
            <Link
              to="/"
              className="inline-block text-white font-semibold px-8 py-3 rounded-full bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 hover:opacity-90 transition"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Items */}
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item._id}
                  className="bg-white rounded-2xl shadow-sm p-4 flex gap-4"
                >
                  <div className="w-24 h-24 sm:w-28 sm:h-28 bg-gray-100 rounded-xl overflow-hidden flex items-center justify-center shrink-0">
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-contain p-2"
                      />
                    ) : (
                      <span className="text-xs text-gray-400">No image</span>
                    )}
                  </div>

                  <div className="flex-1 flex flex-col justify-between">
                    <div className="flex justify-between gap-2">
                      <div>
                        <p className="text-xs uppercase tracking-wide text-gray-500">
                          {item.category}
                        </p>
                        <h3 className="font-bold text-gray-900">
                          {item.name}
                        </h3>
                      </div>
                      <button
                        onClick={() => removeFromCart(item._id)}
                        className="text-sm text-gray-400 hover:text-red-600 transition"
                      >
                        Remove
                      </button>
                    </div>

                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center border border-gray-300 rounded-full">
                        <button
                          onClick={() => updateQty(item._id, item.qty - 1)}
                          className="w-9 h-9 text-lg text-gray-700 hover:text-purple-600"
                        >
                          −
                        </button>
                        <span className="w-8 text-center font-semibold">
                          {item.qty}
                        </span>
                        <button
                          onClick={() => updateQty(item._id, item.qty + 1)}
                          className="w-9 h-9 text-lg text-gray-700 hover:text-purple-600"
                        >
                          +
                        </button>
                      </div>
                      <p className="text-lg font-extrabold text-gray-900">
                        Rs. {item.price * item.qty}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Summary */}
            <div className="bg-white rounded-2xl shadow-sm p-6 h-fit lg:sticky lg:top-24">
              <h2 className="text-lg font-bold text-gray-900 mb-4">
                Order Summary
              </h2>

              <div className="flex justify-between text-gray-600 mb-2">
                <span>Items ({totalItems})</span>
                <span>Rs. {totalPrice}</span>
              </div>
              <div className="flex justify-between text-gray-600 mb-2">
                <span>Delivery</span>
                <span className="text-green-600 font-medium">Free</span>
              </div>
              <div className="flex justify-between text-gray-600 mb-4">
                <span>Payment</span>
                <span>Cash on Delivery</span>
              </div>

              <div className="border-t pt-4 flex justify-between text-lg font-extrabold text-gray-900">
                <span>Total</span>
                <span>Rs. {totalPrice}</span>
              </div>

              <button
                onClick={() => navigate("/checkout")}
                className="mt-6 w-full py-3 rounded-full text-white font-semibold bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 hover:opacity-90 transition"
              >
                Proceed to Checkout
              </button>

              <Link
                to="/"
                className="block text-center text-sm text-purple-600 mt-4 hover:underline"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Cart;