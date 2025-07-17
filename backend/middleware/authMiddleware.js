import jwt from "jsonwebtoken";

export default function authMiddleware(req, res, next) {
  const token = req.header("x-auth-token");

  // Check if token is not provided
  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }

  try {
    // Verify token
    console.log("Token received in middleware:", token); // Log the token
    console.log(
      "Secret used in middleware:",
      process.env.JWT_SECRET ? "Loaded" : "Undefined"
    ); // Check secret here too

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user; // Attach user info to request object
    next(); // Proceed to the next middleware or route handler
  } catch (err) {
    res.status(401).json({ msg: "Token is not valid" });
  }
}
