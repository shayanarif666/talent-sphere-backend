const express = require("express");
require("dotenv").config();
const { dbConnection } = require("./config/dbConnection");
const cors = require("cors");
const authRoutes = require("./routes/auth.routes");

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database connection
dbConnection().catch(console.dir);

// Routes
app.get("/", (req, res) => {
  res.send("Talent Sphere Server is running at PORT : 5000");
});
app.use("/api/auth", authRoutes);

app.use((err, req, res, next) => {
  console.error("ERROR", err);

  return res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
    errors: err.errors || [],
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
  });
});


// Server listen
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});