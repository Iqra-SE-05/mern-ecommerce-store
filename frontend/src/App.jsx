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
    <div style={{ padding: "20px" }}>
      <h1>My Store</h1>
      {products.map((product) => (
        <div
          key={product._id}
          style={{ border: "1px solid #ccc", padding: "10px", marginBottom: "10px" }}
        >
          <h3>{product.name}</h3>
          <p>{product.description}</p>
          <p>Price: Rs. {product.price}</p>
          <p>Category: {product.category}</p>
        </div>
      ))}
    </div>
  );
}

export default App;