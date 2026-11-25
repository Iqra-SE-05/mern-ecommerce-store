import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import ProductCard from "../components/ProductCard";
import { useWishlist } from "../context/WishlistContext";
import { useCart } from "../context/CartContext";

function Wishlist() {
  const { wishlist } = useWishlist();
  const { addToCart } = useCart();

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-6xl mx-auto px-6 py-10">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">My Wishlist</h1>

        {wishlist.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm p-12 text-center">
            <p className="text-5xl mb-4">💝</p>
            <h2 className="text-xl font-semibold text-gray-900">
              Your wishlist is empty
            </h2>
            <p className="text-gray-500 mt-2 mb-6">
              Tap the heart on any product to save it here.
            </p>
            <Link
              to="/"
              className="inline-block text-white font-semibold px-8 py-3 rounded-full bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 hover:opacity-90 transition"
            >
              Browse Products
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {wishlist.map((product) => (
              <ProductCard
                key={product._id}
                product={product}
                onAdd={() => addToCart(product)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Wishlist;