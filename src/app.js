import "dotenv/config";
import express from "express";
import allRoutes from "./routes/index.js";
import { connectDb } from "./db/config.js";
import syncDB from "./db/init.js";

const app = express();
app.use(express.json());

app.use(allRoutes);

connectDb();
syncDB().then(() => {
  console.log("db synced");
});

app.listen(3000, () => {
  console.log("Server started");
});
