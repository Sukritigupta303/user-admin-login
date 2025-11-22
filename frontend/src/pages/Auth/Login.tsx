import React, { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../api/api";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

const handleLogin = async (e: FormEvent) => {
  e.preventDefault();
  try {
    const response = await API.post("/auth/login", { email, password });

    console.log("Login success:", response.data);

    // 🔹 Token Save
    localStorage.setItem("token", response.data.token);
    localStorage.setItem("role", response.data.user.role);
    // 🔹 Successful login par dashboard khol do
   if (response.data.user.role === "admin") {
  navigate("/admin/dashboard");
} else {
  navigate("/user/dashboard");
}
  } catch (error: any) {
    alert(error.response?.data?.message || "Login failed");
  }
};

  return (
    <div className="w-full h-screen relative">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1950&q=80')",
        }}
      ></div>

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Centered form */}
      <div className="relative z-10 flex items-center justify-center h-full w-full">
        <form
          onSubmit={handleLogin}
          className="bg-white bg-opacity-90 backdrop-blur-md p-8 rounded-lg shadow-lg w-full max-w-md"
        >
          <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
            Login
          </h2>

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 mb-4 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 mb-6 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
