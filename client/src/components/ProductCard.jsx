import React from "react";
import { Link } from "react-router-dom";
const ProductCard = ({ product }) => {
  return (
    <>
      <div className="bg-white rounded-lg shadow-md overflow-hidden ">
        <Link to={`/products/${product._id}`}>
          <img
            loading="lazy"
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
          />
        </Link>
        <div className="p-4">
          <Link to={`/products/${product._id}`} className="block">
            <h3 className="text-x1 font-semibold text-gray-800 hover:text-[#88c8bc] transition-colors duration-200">
              {product.name}
            </h3>
          </Link>
          <p className="mt-2 text-2xl font-bold text-[#88c8bc]">
            ${product.price}
          </p>
        </div>
      </div>
    </>
  );
};

export default ProductCard;
