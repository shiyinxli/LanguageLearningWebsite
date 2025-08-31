require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// Routes
const authRoutes = require("./routes/auth");
const wordRoutes = require("./routes/words");

app.use("/auth", authRoutes);
app.use("/words", wordRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost: ${PORT}`);
});