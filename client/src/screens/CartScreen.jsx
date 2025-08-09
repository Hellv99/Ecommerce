// src/screens/CartScreen.jsx
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const CartScreen = () => {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Load cart items from local storage
    const itemsFromStorage = localStorage.getItem("cartItems");
    if (itemsFromStorage) {
      setCartItems(JSON.parse(itemsFromStorage));
    }
  }, []);

  const removeFromCartHandler = (id) => {
    // We will implement this later
    console.log(`Removed item ${id} from cart`);
  };

  const checkoutHandler = () => {
    navigate("/login?redirect=/shipping");
  };

  const subtotal = cartItems
    .reduce((acc, item) => acc + item.price * item.qty, 0)
    .toFixed(2);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">
        Shopping Cart
      </h1>

      {cartItems.length === 0 ? (
        <div className="text-center text-gray-600 p-8 bg-white rounded-lg shadow-md">
          Your cart is empty.{" "}
          <Link to="/" className="text-[#88c8bc] hover:underline">
            Go Back
          </Link>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Cart Items List */}
          <div className="w-full lg:w-3/4 space-y-4">
            {cartItems.map((item) => (
              <div
                key={item.product}
                className="flex items-center bg-white p-4 rounded-lg shadow-sm"
              >
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded-md"
                />
                <div className="flex-1 ml-4">
                  <Link
                    to={`/product/${item.product}`}
                    className="text-xl font-semibold text-gray-800 hover:text-[#88c8bc]"
                  >
                    {item.name}
                  </Link>
                  <p className="text-gray-600 mt-1">${item.price}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <select
                    className="border border-gray-300 rounded-md px-2 py-1"
                    value={item.qty}
                    onChange={(e) =>
                      console.log(
                        "Update quantity:",
                        item.product,
                        e.target.value
                      )
                    }
                  >
                    {[...Array(item.countInStock).keys()].map((x) => (
                      <option key={x + 1} value={x + 1}>
                        {x + 1}
                      </option>
                    ))}
                  </select>
                  <button
                    onClick={() => removeFromCartHandler(item.product)}
                    className="text-red-500 hover:text-red-700 transition-colors"
                  >
                    <i className="fas fa-trash"></i>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Subtotal and Checkout */}
          <div className="w-full lg:w-1/4">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)})
                items
              </h2>
              <p className="text-xl font-bold text-[#88c8bc] mb-4">
                ${subtotal}
              </p>
              <button
                onClick={checkoutHandler}
                className="w-full px-4 py-2 bg-[#88c8bc] text-white font-semibold rounded-lg hover:bg-[#72af9a] transition-colors"
                disabled={cartItems.length === 0}
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartScreen;
