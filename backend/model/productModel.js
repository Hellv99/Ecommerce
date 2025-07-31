import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    name: { type: String, required: true }, // Name of the user who reviewed
    rating: { type: Number, required: true }, // Rating given (e.g., 1-5)
    comment: { type: String, required: true },
    user: {
      // Reference to the User who wrote the review
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt for the review itself
  }
);

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
    reviews: [reviewSchema], // Array of reviews
    rating: {
      // Average rating from all reviews
      type: Number,
      required: true,
      default: 0,
    },
    numReviews: {
      // Total number of reviews
      type: Number,
      required: true,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);
export default Product;
