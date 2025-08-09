// src/components/Header.jsx
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const [userInfo, setUserInfo] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUserInfo = localStorage.getItem("userInfo");
    if (storedUserInfo) {
      setUserInfo(JSON.parse(storedUserInfo));
    } else {
      setUserInfo(null);
    }
  }, []);

  const logoutHandler = () => {
    localStorage.removeItem("userInfo");
    setUserInfo(null);
    navigate("/");
    window.location.reload();
  };

  return (
    <>
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          {/* Logo on the left */}
          <div className="flex items-center">
            <Link
              to="/"
              className="text-2xl font-bold text-gray-800 tracking-wider"
            >
              FootZe
            </Link>
          </div>

          {/* Navigation links in the center */}
          <nav className="flex items-center space-x-6">
            <Link
              to="/"
              className="text-gray-600 hover:text-[#88c8bc] transition-colors duration-200"
            >
              Home
            </Link>
            <Link
              to="/collections"
              className="text-gray-600 hover:text-[#88c8bc] transition-colors duration-200"
            >
              Collections
            </Link>
            <Link
              to="/about"
              className="text-gray-600 hover:text-[#88c8bc] transition-colors duration-200"
            >
              About
            </Link>
            <Link
              to="/contact"
              className="text-gray-600 hover:text-[#88c8bc] transition-colors duration-200"
            >
              Contact
            </Link>
          </nav>

          {/* User/Search functionality on the right */}
          <div className="flex items-center space-x-4">
            {/* Conditional Rendering for User */}
            {userInfo ? (
              <div className="flex items-center space-x-2">
                <span className="text-gray-800 font-semibold">
                  {userInfo.name}
                </span>
                <button
                  onClick={logoutHandler}
                  className="text-gray-600 hover:text-red-500 transition-colors duration-200 font-semibold"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="px-4 py-2 text-white bg-[#88c8bc] rounded-md hover:bg-[#72af9a] font-semibold"
              >
                Sign In
              </Link>
            )}
            {/* Search Form (I've moved this to be more responsive with the user links) */}
            <form className="flex items-center ml-4">
              <input
                type="text"
                placeholder="Search"
                className="px-4 py-2 text-gray-700 bg-gray-100 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-[#88c8bc] w-32 md:w-auto"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-[#88c8bc] text-white font-semibold rounded-r-md hover:bg-[#87b9b0]"
              >
                search
              </button>
            </form>{" "}
            <Link
              to="/cart"
              className="text-gray-600 hover:text-gray-900 transition-colors duration-200"
            >
              Cart
            </Link>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
