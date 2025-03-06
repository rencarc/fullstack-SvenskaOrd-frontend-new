const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const svenskaOrdRoutes = require("./routes/SvenskaOrdRoute");

const app = express();

// 中间件
app.use(cors());
app.use(express.json());

// 连接 MongoDB
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("Connected To MongoDB..."))
  .catch((err) => console.log("MongoDB Connection Error:", err));

// 根路径测试
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Svenska Ord API" });
});

// API 路由
app.use("/api/svenska", svenskaOrdRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Listening on: ${PORT}`));
