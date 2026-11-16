import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useCart } from "../context/CartContext";

function Cart() {
  const { cartItems, removeFromCart, updateQty, totalPrice } = useCart();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="max-w-4xl mx-auto p-8">
        <h2 className="text-xl font-semibold mb-6 text-gray-800">
          Shopping Cart
        </h2>

        {cartItems.length === 0 ? (
          <div className="bg-white p-6 rounded-xl shadow">
            <p className="text-gray-600">Your cart is empty.</p>
            <Link to="/" className="text-indigo-600 text-sm">
              Go shopping
            </Link>
          </div>
        ) : (
          <>
            {cartItems.map((item) => (
              <div
                key={item._id}
                className="bg-white p-4 rounded-xl shadow mb-4 flex justify-between items-center"
              >
                <div>
                  <h3 className="font-bold text-gray-900">{item.name}</h3>
                  <p className="text-indigo-600 font-semibold">
                    Rs. {item.price}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => updateQty(item._id, item.qty - 1)}
                    className="bg-gray-200 px-3 py-1 rounded"
                  >
                    -
                  </button>
                  <span>{item.qty}</span>
                  <button
                    onClick={() => updateQty(item._id, item.qty + 1)}
                    className="bg-gray-200 px-3 py-1 rounded"
                  >
                    +
                  </button>
                  <button
                    onClick={() => removeFromCart(item._id)}
                    className="text-red-600 text-sm ml-4"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}

            <div className="bg-white p-4 rounded-xl shadow flex justify-between items-center">
              <span className="text-lg font-bold text-gray-900">
                Total: Rs. {totalPrice}
              </span>
              <button
  onClick={() => navigate("/checkout")}
  className="bg-indigo-600 text-white px-5 py-2 rounded-lg hover:bg-indigo-700"
>
  Checkout
</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Cart;