import express from "express";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes";
import { connectDB } from "./config/db";

dotenv.config();

connectDB();

const app = express();
app.use(express.json());

const port = process.env.PORT


// Routes
app.use("/api/users", userRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});