const express = require("express");
require("dotenv").config();
const cors = require("cors");
const path = require("path");
const connectDB = require("./config/db");
const { protect } = require("./middlewares/authMiddleware");
const authRoutes = require("./routes/authRoutes");
const sessionRoutes = require("./routes/sessionRoutes");
const questionRoutes = require("./routes/questionRoutes");
const {
  generateInterviewQuestions,
  generateConceptExplantion,
} = require("./controllers/aiController");

const app = express();
// connect DB
connectDB();

// middleware for cors
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

// middleware
app.use(express.json());
app.use("/uploads", express.static("uploads"));

//routes
app.use("/api/auth", authRoutes);
app.use("/api/sessions", sessionRoutes);
app.use("/api/questions", questionRoutes);

app.use("/api/ai/generate-questions", protect, generateInterviewQuestions);
app.use("/api/ai/generate-explanation", protect, generateConceptExplantion);

// server uploads
app.use("/uploads", express.static(path.join(__dirname, "uploads"), {}));

// start server
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`SERVER LISTENING TO PORT ${PORT}`);
});
