import express from "express";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes";
import { connectDB } from "./config/db";
import authRoutes from "./routes/authRoutes";
import supportGroupRoutes from "./routes/supportGroupRoutes";
import sessionRoutes from "./routes/sessionRoutes";
import providerRoutes from "./routes/providerRoutes";

dotenv.config();

connectDB();

const app = express();
app.use(express.json());

const port = process.env.PORT


// Routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/support-groups", supportGroupRoutes);
app.use("/api/sessions", sessionRoutes);
app.use("/api/providers", providerRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});