import User from "../model/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

//REGISTER USER
export const register = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Check if user already exists by email or username
    let user = await User.findOne({ email });
    if (user) {
      return res
        .status(400)
        .json({ msg: "User with this email already exists" });
    }

    user = await User.findOne({ username });
    if (user) {
      return res
        .status(400)
        .json({ msg: "User with this username already exists" });
    }

    // Create new user instance
    user = new User({
      username,
      email,
      password, // This will be hashed before saving
    });

    // Hash password before saving (pre-save hook for schema, or manually here)
    // For now, let's do it manually for clarity, then we'll refactor with a Mongoose pre-save hook.
    const salt = await bcrypt.genSalt(10); // Generate a salt
    user.password = await bcrypt.hash(password, salt); // Hash the password with the salt

    await user.save(); // Save the user to the database

    res.status(201).json({
      msg: "User registered successfully",
      user: { id: user._id, username: user.username, email: user.email },
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

//Login User
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user exists
    let user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }
    // Generate JWT token
    const payload = { user: { id: user.id } };
    console.log("JWT_SECRET value before signing:", process.env.JWT_SECRET);
    // ... then your jwt.sign() call ...
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRE },
      (err, token) => {
        if (err) throw err;
        res.json({
          token,
          user: { id: user._id, username: user.username, email: user.email },
        });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};
