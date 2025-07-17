import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
dotenv.config();
const app = express();

app.use(express.json());

app.use("/api/auth", authRoutes);

app.listen(5000, () => {
  connectDB();
  console.log(`App listening on at http://localhost:5000`);
});
