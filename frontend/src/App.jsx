import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Orders from "./pages/Orders";
import OrderSuccess from "./pages/OrderSuccess";
import AdminDashboard from "./pages/AdminDashboard";
import AdminOrders from "./pages/AdminOrders";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Categories from "./components/Categories";
import ProductRow from "./components/ProductRow";
import ProductCard from "./components/ProductCard";
import { useCart } from "./context/CartContext";
import { API_URL } from "./config";
import Wishlist from "./pages/Wishlist";

function Home() {
  const [products, setProducts] = useState([]);
  const { addToCart } = useCart();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("newest");
  const [maxPrice, setMaxPrice] = useState("");
  const [inStockOnly, setInStockOnly] = useState(false);

  useEffect(() => {
    fetch(`${API_URL}/api/products`)
      .then((res) => res.json())
      .then((data) => setProducts(Array.isArray(data) ? data : []))
      .catch((error) => console.log(error));
  }, []);

  const categories = ["All", ...new Set(products.map((p) => p.category))];

  const newest = [...products].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );
  const featured = newest.slice(0, 4);
  const bestSellers = [...products]
    .sort((a, b) => a.countInStock - b.countInStock)
    .filter((p) => p.countInStock > 0)
    .slice(0, 4);

  let filtered = products.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === "All" || p.category === category;
    const matchesPrice = maxPrice === "" || p.price <= Number(maxPrice);
    const matchesStock = !inStockOnly || p.countInStock > 0;
    return matchesSearch && matchesCategory && matchesPrice && matchesStock;
  });

  if (sort === "low") filtered.sort((a, b) => a.price - b.price);
  if (sort === "high") filtered.sort((a, b) => b.price - a.price);
  if (sort === "newest")
    filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  const inputClass = "border rounded-lg px-3 py-2 bg-white";

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Hero />

      <Categories
        categories={categories}
        active={category}
        onSelect={(c) => {
          setCategory(c);
          document
            .getElementById("products")
            ?.scrollIntoView({ behavior: "smooth" });
        }}
      />

      <ProductRow
        title="Featured Products"
        subtitle="Our newest arrivals"
        products={featured}
        onAdd={addToCart}
      />

      <section className="max-w-6xl mx-auto px-8 pt-12">
        <div className="rounded-3xl p-10 text-white bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <p className="uppercase text-sm tracking-widest opacity-90">
              Limited Offer
            </p>
            <h2 className="text-3xl font-extrabold mt-1">
              Free Delivery on Every Order
            </h2>
            <p className="opacity-90 mt-1">
              Pay when it arrives with Cash on Delivery.
            </p>
          </div>
          <a
            href="#products"
            className="bg-white text-pink-600 font-bold px-8 py-3 rounded-full hover:scale-105 transition"
          >
            Shop Now
          </a>
        </div>
      </section>

      <ProductRow
        title="Best Sellers"
        subtitle="Customer favourites"
        products={bestSellers}
        onAdd={addToCart}
      />

      <div id="products" className="max-w-6xl mx-auto px-8 py-12">
        <h2 className="text-2xl font-bold mb-6 text-gray-900">All Products</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className={`${inputClass} sm:col-span-2`}
          />
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className={inputClass}
          >
            <option value="newest">Newest</option>
            <option value="low">Price: Low to High</option>
            <option value="high">Price: High to Low</option>
          </select>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className={inputClass}
          >
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
          <input
            type="number"
            placeholder="Max price"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className={inputClass}
          />
          <label className="flex items-center gap-2 text-sm text-gray-700">
            <input
              type="checkbox"
              checked={inStockOnly}
              onChange={(e) => setInStockOnly(e.target.checked)}
            />
            In stock only
          </label>
        </div>

        {filtered.length === 0 ? (
          <p className="text-gray-500">No products found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filtered.map((product) => (
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

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/wishlist" element={<Wishlist />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/orders" element={<Orders />} />
      <Route path="/order-success" element={<OrderSuccess />} />
      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="/admin/orders" element={<AdminOrders />} />
    </Routes>
  );
}

export default App;