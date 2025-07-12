import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Please provide a username"], // Custom error message
      unique: true, // Ensures no two users have the same username
      trim: true, // Removes whitespace from both ends
      minlength: [3, "Username must be at least 3 characters long"],
    },
    email: {
      type: String,
      required: [true, "Please provide an email"],
      unique: true,
      trim: true,
      lowercase: true, // Converts email to lowercase before saving
      match: [/.+@.+\..+/, "Please use a valid email address"], // Basic email regex validation
    },
    password: {
      type: String,
      required: [true, "Please provide a password"],
      minlength: [6, "Password must be at least 6 characters long"],
      select: false, // This will prevent the password from being returned in queries by default
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

module.exports = mongoose.model("User", userSchema);
