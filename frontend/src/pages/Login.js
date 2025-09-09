import React, { useState } from "react";
import axios from "axios";

const API_BASE = "https://languagelearningwebsite-backend.onrender.com";

function Login({ onLogin, switchToSignup }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API_BASE}/auth/login`, {
        email,
        password,
      });
      const { token } = res.data;
      localStorage.setItem("token", token);
      onLogin(); // go to Today page
    } catch (err) {
      alert("Login failed: " + err.response?.data?.error || err.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-beige-100">
      <form
        onSubmit={handleLogin}
        className="bg-white p-6 rounded-2xl shadow-md w-96"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">Log In</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border rounded p-2 mb-3"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border rounded p-2 mb-4"
        />
        <button
          type="submit"
          className="w-full bg-[#D9CAB3] text-white py-2 rounded hover:bg-[#CBB79D]"
        >
          Log In
        </button>

        {/* Switch to Signup */}
        <p className="text-center text-gray-600 mt-4">
          Don’t have an account?{" "}
          <button
            type="button"
            onClick={switchToSignup}
            className="text-blue-600 hover:underline"
          >
            Sign up
          </button>
        </p>
      </form>
    </div>
  );
}

export default Login;
