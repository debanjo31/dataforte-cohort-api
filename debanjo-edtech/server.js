import express from "express";
import bodyParser from "body-parser";
import adminRouter from "./router/admin.js";
import mongoose from "mongoose";

mongoose
  .connect("mongodb://localhost:27017/debanjo")
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log(err);
  });

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

const PORT = 8080;

app.get("/", (req, res) => {
  res.send("Welcome to debanjo api");
});
app.use("/", adminRouter);

app.listen(PORT, (req, res) => {
  console.log(`Server is running on port ${PORT}`);
});
