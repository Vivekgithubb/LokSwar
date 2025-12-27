import express from "express";
import connectDB from "./mongoDb/connectDb.js";
import authRoutes from "./routes/authRoutes.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import errorController from "./utils/errorController.js";
// Middleware
const app = express();
app.use(express.json());
connectDB();

app.use(cookieParser());
app.use(
  cors({
    origin: ["http://localhost:5173", "http://192.168.1.128:5173"],
    credentials: true,
  })
);
// Routes
app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.use(errorController);
app.use("/auth", authRoutes);

export default app;
