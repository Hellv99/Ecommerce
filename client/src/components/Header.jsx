import React from "react";
import { Link } from "react-router-dom";
const Header = () => {
  return (
    <>
      <header className="bg-white shadow-md ">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center"></div>
        <div className="flex items-center">
          <Link
            to="/"
            className="text-2xl font-bold text-gray-800 tracking-wider"
          >
            FootZe
          </Link>
        </div>
        <div className="flex grow mx-10">
          <form className="flex items-center w-full max-w-xl mx-auto">
            <input
              type="text"
              placeholder="Search"
              className="flex-grow px-4 py-2 text-gray-700 bg-gray-100 border border-gray-300 rounded-l-md focus: outline-none focus:ring-2 focus:ring-[#88c8bc]"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-[#88c8bc] text-white font-semibold rounded-r-md hover:bg-[#87b9b0]"
            >
              search
            </button>
          </form>
        </div>
        {/*nav */}
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
      </header>
    </>
  );
};

export default Header;
