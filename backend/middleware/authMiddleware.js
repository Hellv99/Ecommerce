import jwt from "jsonwebtoken";
import User from "../model/user.js";

export function auth(req, res, next) {
  const token = req.header("x-auth-token");

  // Check if token is not provided
  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user; // Attach user info to request object
    next(); // Proceed to the next middleware or route handler
  } catch (err) {
    res.status(401).json({ msg: "Token is not valid" });
  }
}

export async function admin(req, res, next) {
  if (!req.user || !req.user.id) {
    return res.status(401).json({ msg: "Not autrhorized, No user ID found" });
  }
  try {
    const user = await User.findById(req.user.id);
    if (user && user.isAdmin) {
      next(); // User is admin, proceed to the next middleware or route handler
    } else {
      res.status(403).json({ msg: "Access denied, admin only" });
    }
  } catch (error) {
    console.error("Admin check failed:", error.message);
    res.status(500).send("Server error");
  }
}
