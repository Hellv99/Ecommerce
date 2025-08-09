// src/screens/LoginScreen.jsx
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // useEffect to check if user is already logged in
  useEffect(() => {
    const userInfo = localStorage.getItem("userInfo");
    if (userInfo) {
      navigate("/");
    }
  }, [navigate]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await axios.post("/api/auth/login", { email, password });

      // Save user info and token to local storage
      localStorage.setItem("userInfo", JSON.stringify(data));

      setLoading(false);
      navigate("/"); // Redirect to the home page
    } catch (error) {
      setLoading(false);
      setMessage(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Sign In
        </h1>
        {message && (
          <div className="text-center text-red-500 mb-4">{message}</div>
        )}
        {loading && (
          <div className="text-center text-[#88c8bc] mb-4">Loading...</div>
        )}
        <form onSubmit={submitHandler} className="space-y-4">
          <div>
            <label className="block text-gray-700">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#88c8bc]"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#88c8bc]"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 text-lg font-semibold text-white bg-[#88c8bc] rounded-md hover:bg-[#72af9a] transition-colors duration-200"
          >
            Sign In
          </button>
        </form>
        <div className="mt-6 text-center text-gray-600">
          New Customer?{" "}
          <Link to="/register" className="text-[#88c8bc] hover:underline">
            Register
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
