import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

import userRoutes from "./routes/userRoutes.js";

dotenv.config();

const uri = process.env.MONGOBD_URI.replace("<PASSWORD>", process.env.DB_PASSWORD);
mongoose
  .connect(uri)
  .then(() => console.log("Connected to database"))
  .catch((err) => console.log(err));

const app = express();

app.use("/api/user", userRoutes);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
