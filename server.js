import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import taskRoutes from "./routes/taskRoutes.js";
import path from "path";
import { fileURLToPath } from "url";

const port = process.env.PORT || 8000;

dotenv.config();
const app = express();
const __dirname = path.dirname(fileURLToPath(import.meta.url));

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/", taskRoutes);

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(process.env.PORT, () => console.log(`Server running on http://localhost:${process.env.PORT}`));
  })
  .catch(err => console.error("MongoDB Connection Error:", err));
