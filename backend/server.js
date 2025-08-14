const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/db");

dotenv.config(); // Load environment variables

const app = express();

// Middleware to parse JSON requests
app.use(express.json());

app.use(cookieParser());

// Enable CORS for frontend-backend communication
app.use(cors({
  origin: "http://localhost:5173", 
  credentials: true,
}));

// Connect to MongoDB
connectDB();

app.use('/api/auth', require('./routes/auth'));

app.use('/api/jobs', require('./routes/jobs'));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
