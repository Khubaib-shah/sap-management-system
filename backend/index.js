import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import inventoryRoute from "./routes/inventoryRoute.js";
import dbConnect from "./config/dbConnection.js";

const app = express();
dotenv.config();
app.use(cors());
dbConnect();
app.use(express.json());

app.use("/inventory", inventoryRoute);
app.use("/", (req, res) => {
  res
    .status(200)
    .json({ message: "hello world", inventoryRoute: "/inventory" });
});

let port = process.env.PORT || 5001;

app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});
