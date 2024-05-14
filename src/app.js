import "dotenv/config";
import express from "express";
import allRoutes from "./routes/index.js";
import { connectDb } from "./db/config.js";

const app = express();
app.use(express.json());

app.use(allRoutes);

connectDb();

app.listen(3000, () => {
  console.log("Server started");
});
