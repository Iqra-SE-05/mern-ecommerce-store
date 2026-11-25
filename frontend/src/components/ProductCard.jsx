import { useWishlist } from "../context/WishlistContext";

function ProductCard({ product, onAdd }) {
  const { toggleWishlist, isInWishlist } = useWishlist();
  const liked = isInWishlist(product._id);

  const isNew =
    product.createdAt &&
    Date.now() - new Date(product.createdAt).getTime() <
      14 * 24 * 60 * 60 * 1000;
  const outOfStock = product.countInStock === 0;

  return (
    <div className="group bg-white rounded-2xl shadow-md hover:shadow-xl transition p-4 flex flex-col">
      <div className="relative aspect-square bg-gray-100 rounded-xl overflow-hidden flex items-center justify-center">
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-contain p-4 group-hover:scale-105 transition duration-300"
          />
        ) : (
          <span className="text-gray-400 text-sm">No image</span>
        )}

        {isNew && (
          <span className="absolute top-3 left-3 bg-purple-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
            New
          </span>
        )}

        <button
          onClick={() => toggleWishlist(product)}
          aria-label="Add to wishlist"
          className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white shadow flex items-center justify-center hover:scale-110 transition"
        >
          <svg
            viewBox="0 0 24 24"
            className="w-5 h-5"
            fill={liked ? "#ec4899" : "none"}
            stroke={liked ? "#ec4899" : "#374151"}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        </button>

        {outOfStock && (
          <span className="absolute bottom-3 left-3 bg-gray-800 text-white text-xs font-semibold px-3 py-1 rounded-full">
            Out of stock
          </span>
        )}
      </div>

      <p className="text-xs uppercase tracking-wide text-gray-500 mt-4">
        {product.category}
      </p>
      <h3 className="text-lg font-bold text-gray-900 mt-1 line-clamp-1">
        {product.name}
      </h3>
      <p className="text-sm text-gray-600 mt-1 line-clamp-2 min-h-[2.5rem]">
        {product.description}
      </p>

      <div className="flex items-center justify-between mt-4">
        <span className="text-xl font-extrabold text-gray-900">
          Rs. {product.price}
        </span>
      </div>

      <button
        onClick={onAdd}
        disabled={outOfStock}
        className="mt-4 w-full py-2.5 rounded-full text-white font-semibold bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 hover:opacity-90 transition disabled:opacity-40 disabled:cursor-not-allowed"
      >
        {outOfStock ? "Out of Stock" : "Add to Cart"}
      </button>
    </div>
  );
}

export default ProductCard;