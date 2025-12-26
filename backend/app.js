import express from "express";
import connectDB from "./mongoDb/connectDb.js";
import authRoutes from "./routes/authRoutes.js";
import cookieParser from "cookie-parser";

// Middleware
const app = express();
app.use(express.json());
connectDB();

app.use(cookieParser());
// Routes
app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.use("/auth", authRoutes);

export default app;
