import React from "react";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const ProductDetailScreen = () => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await axios.get(`/api/products/${id}`);

        setProduct(data.data);
        setLoading(false);
      } catch (err) {
        setError("Product not found.");
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const addToCartHandler = () => {
    navigate(`/cart/${id}`);
  };

  if (loading) {
    return (
      <div className="text-center text-[#88c8bc] mt-10">
        Loading product details...
      </div>
    );
  }

  if (error) {
    return <div className="text-center text-red-500 mt-10">{error}</div>;
  }

  if (!product) {
    return (
      <div className="text-center text-gray-600 mt-10">
        Product details not available.
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex flex-col md:flex-row gap-8 items-center">
        {/* Product Image */}
        <div className="w-full md:w-1/2">
          <img
            loading="lazy"
            src={product.imageUrl}
            alt={product.name}
            className="rounded-lg shadow-md w-full"
          />
        </div>

        {/* Product Details */}
        <div className="w-full md:w-1/2 p-4 space-y-4">
          <h1 className="text-4xl font-bold text-gray-800">{product.name}</h1>
          <p className="text-gray-600">{product.description}</p>
          <div className="flex items-center justify-between">
            <span className="text-3xl font-bold text-[#88c8bc]">
              ${product.price}
            </span>
            <button
              onClick={addToCartHandler}
              className="px-6 py-3 bg-[#88c8bc] text-white font-semibold rounded-lg hover:bg-[#72af9a] transition-colors duration-200"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailScreen;
