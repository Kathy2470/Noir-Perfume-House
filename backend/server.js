const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();

console.log("MONG URI:", process.env.MONGO_URI);

// Connect Database
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

const productRoutes = require("./routes/productRoutes");
app.use("/api/products", productRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("Noir Perfume House API is running 🚀");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
