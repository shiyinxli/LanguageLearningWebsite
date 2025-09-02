import React, { useState } from "react";
import axios from "axios";

function Signup({ onSignup, switchToLogin }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3000/auth/signup", {
        username,
        email,
        password,
      });
      alert("Signup successful! Please log in.");
      switchToLogin(); // switch to login page
    } catch (err) {
      alert("Signup failed: " + err.response?.data?.error || err.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-beige-100">
      <form
        onSubmit={handleSignup}
        className="bg-white p-6 rounded-2xl shadow-md w-96"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">Sign Up</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full border rounded p-2 mb-3"
        />
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
          Sign Up
        </button>

        {/* Switch to Login */}
        <p className="text-center text-gray-600 mt-4">
          Already have an account?{" "}
          <button
            type="button"
            onClick={switchToLogin}
            className="text-blue-600 hover:underline"
          >
            Log in
          </button>
        </p>
      </form>
    </div>
  );
}

export default Signup;
