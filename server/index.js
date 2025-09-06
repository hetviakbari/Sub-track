const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

const authRoutes = require("./routes/auth");         // Registration
const loginRoutes = require("./routes/login");       // Login
const subscriptionRoutes = require("./routes/subscriptionRoutes"); // Subscription routes

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/auth", authRoutes);           // Registration route
app.use("/api/login", loginRoutes);         // Login route
app.use("/api/subscriptions", subscriptionRoutes); // Subscription routes

// Test Route
app.get("/", (req, res) => {
  res.send("💻 SubTrack backend running!");
});

// Health check route
app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Server is healthy",
    timestamp: new Date().toISOString()
  });
});

// 404 handler for undefined routes (must be after all other routes)
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found`
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error("Global error:", err.stack);
  
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Something went wrong!",
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});

// Connect to MongoDB and start server
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("✅ MongoDB connected");
    app.listen(PORT, () => {
      console.log(`✅ Server running on port ${PORT}`);
      console.log(`🚀 API endpoints available:`);
      console.log(`   - POST /api/auth (Registration)`);
      console.log(`   - POST /api/login (Login)`);
      console.log(`   - POST /api/subscriptions (Create subscription)`);
      console.log(`   - GET  /api/subscriptions (Get all subscriptions)`);
      console.log(`   - GET  /api/subscriptions/stats (Get statistics)`);
      console.log(`   - GET  /api/subscriptions/:id (Get single subscription)`);
      console.log(`   - PUT  /api/subscriptions/:id (Update subscription)`);
      console.log(`   - DELETE /api/subscriptions/:id (Delete subscription)`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1);
  });