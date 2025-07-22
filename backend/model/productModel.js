import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Product name is required"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Product description is required"],
    },
    price: {
      type: Number,
      required: [true, "Product price is required"],
      trim: true,
    },
    imageUrl: {
      type: String,
      required: true,
      default: "https://via.placeholder.com/150",
    },

    category: {
      type: String,
      required: true,
      trim: true,
    },

    countinStock: {
      type: Number,
      required: [true, "Product stock count is required"],
      default: 0,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);
export default Product;
