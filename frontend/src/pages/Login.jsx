import { useState } from "react";
import { API_URL } from "../config";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.message);
        return;
      }

      localStorage.setItem("userInfo", JSON.stringify(data));
      navigate("/");
    } catch (err) {
      setError("Server se connect nahi ho paya");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow w-full max-w-sm"
      >
        <h2 className="text-2xl font-bold mb-6 text-gray-900">Login</h2>

        {error && <p className="text-red-600 text-sm mb-4">{error}</p>}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border rounded-lg px-3 py-2 mb-4"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border rounded-lg px-3 py-2 mb-4"
          required
        />

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700"
        >
          Login
        </button>

        <p className="text-sm mt-4 text-gray-600">
          New here?{" "}
          <Link to="/register" className="text-indigo-600">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Login;