import { useEffect, useState } from "react";
import { API_URL } from "../config";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

function AdminDashboard() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    countInStock: "",
    image: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  const loadProducts = () => {
    fetch(`${API_URL}/api/products`)
      .then((res) => res.json())
      .then((data) => setProducts(Array.isArray(data) ? data : []));
  };

  useEffect(() => {
    if (!userInfo || userInfo.role !== "admin") {
      navigate("/");
      return;
    }
    loadProducts();
    // eslint-disable-next-line
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    setError("");

    const res = await fetch(`${API_URL}/api/products`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
      body: JSON.stringify({
        ...form,
        price: Number(form.price),
        countInStock: Number(form.countInStock),
      }),
    });
    const data = await res.json();

    if (!res.ok) {
      setError(data.message);
      return;
    }

    setForm({
      name: "",
      description: "",
      price: "",
      category: "",
      countInStock: "",
      image: "",
    });
    loadProducts();
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this product?")) return;

    await fetch(`${API_URL}/api/products/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    loadProducts();
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="max-w-5xl mx-auto p-8">
        <h2 className="text-xl font-semibold mb-6 text-gray-800">
          Admin Dashboard
        </h2>

        <form
          onSubmit={handleAdd}
          className="bg-white p-6 rounded-xl shadow mb-8 grid grid-cols-1 sm:grid-cols-2 gap-4"
        >
          {error && (
            <p className="text-red-600 text-sm sm:col-span-2">{error}</p>
          )}
          <input name="name" placeholder="Name" value={form.name} onChange={handleChange} className="border rounded-lg px-3 py-2" required />
          <input name="category" placeholder="Category" value={form.category} onChange={handleChange} className="border rounded-lg px-3 py-2" required />
          <input name="price" type="number" placeholder="Price" value={form.price} onChange={handleChange} className="border rounded-lg px-3 py-2" required />
          <input name="countInStock" type="number" placeholder="Stock" value={form.countInStock} onChange={handleChange} className="border rounded-lg px-3 py-2" required />
          <input name="description" placeholder="Description" value={form.description} onChange={handleChange} className="border rounded-lg px-3 py-2 sm:col-span-2" required />
          <input name="image" placeholder="Image URL (optional)" value={form.image} onChange={handleChange} className="border rounded-lg px-3 py-2 sm:col-span-2" />
          <button type="submit" className="bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 sm:col-span-2">
            Add Product
          </button>
        </form>

        {products.map((p) => (
          <div key={p._id} className="bg-white p-4 rounded-xl shadow mb-3 flex justify-between items-center">
            <div>
              <h3 className="font-bold text-gray-900">{p.name}</h3>
              <p className="text-sm text-gray-600">
                {p.category} • Rs. {p.price} • Stock: {p.countInStock}
              </p>
            </div>
            <button onClick={() => handleDelete(p._id)} className="text-red-600 text-sm">
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminDashboard;