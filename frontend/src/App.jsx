import { useEffect, useState } from "react";

function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((error) => console.log(error));
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-indigo-600 text-white px-8 py-4 shadow">
        <h1 className="text-2xl font-bold">My Store</h1>
      </nav>

      <div className="max-w-6xl mx-auto p-8">
        <h2 className="text-xl font-semibold mb-6 text-gray-800">
          Our Products
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div
              key={product._id}
              className="bg-white rounded-xl shadow hover:shadow-lg transition p-5"
            >
              <span className="text-xs bg-indigo-100 text-indigo-700 px-2 py-1 rounded-full">
                {product.category}
              </span>
              <h3 className="text-lg font-bold mt-3 text-gray-900">
                {product.name}
              </h3>
              <p className="text-gray-600 text-sm mt-2">
                {product.description}
              </p>
              <div className="flex justify-between items-center mt-4">
                <span className="text-xl font-bold text-indigo-600">
                  Rs. {product.price}
                </span>
                <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-indigo-700">
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;