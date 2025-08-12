require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors({
  origin: process.env.CLIENT_URL || "https://auth-frontend-orpin.vercel.app/",
  credentials: true
}));
app.use(express.json());

const authRoutes = require("./routes/auth");
const profileRoutes = require("./routes/Profile");

app.use("/api/auth", authRoutes);
app.use("/api/profile", profileRoutes);

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("✅ MongoDB connected successfully");
    app.listen(process.env.PORT || 5000, () => {
      console.log(`🚀 Server running on port ${process.env.PORT || 5000}`);
    });
  })
  .catch((err) => console.error("❌ MongoDB connection error:", err));
