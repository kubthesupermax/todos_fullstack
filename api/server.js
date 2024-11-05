const express = require("express");
const connectDB = require("./db/connectDB");
const todoRoutes = require("./routes/todoRoutes");

require("dotenv").config();

const app = express();

const PORT = process.env.PORT || 3000;

// middlewares
app.use(express.json());

// routes
app.use("/todos", todoRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
  connectDB();
});
