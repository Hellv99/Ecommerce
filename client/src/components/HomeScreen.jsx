import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "./ProductCard.jsx";

const HomeScreen = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get("/api/products");
        setProducts(data.products);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch produts. Please try again later.");
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <>
      <div className="bg-white p-6">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
          Latest Footwear
        </h1>
        {loading ? (
          <div className="text-center text-[#88c8bc]">Loading...</div>
        ) : error ? (
          <div className="text-center text-red-500">{error}</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default HomeScreen;
