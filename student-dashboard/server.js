import express from "express";
// import mongoose from "mongoose";
import bodyParser from "body-parser";
import { MongoClient, ObjectId } from "mongodb";
const app = express();
const port = 3000;

//connect to mongodb
// mongoose.connect('mongodb://localhost:27017/studentDB').then(() => {
//     console.log('Connected to MongoDB');
// }).catch((err) => {
//     console.log(err);
//     }
// );

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

let db;

MongoClient.connect("mongodb://localhost:27017/studentDB")
  .then((client) => {
    console.log("Connected to MongoDB");
    db = client.db("studentDB");
  })
  .catch((err) => {
    console.log(err);
  });

app.get("/students", async (req, res) => {
  try {
    const students = await db.collection("students").find().toArray();
    console.log(students);
    return res.json(students);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: error.message,
    });
  }
});

app.post("/students", async (req, res) => {
  try {
    console.log(req.body, "req.body");
    const student = await db.collection("students").insertOne(req.body);
    res.status(210).json(student);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
});

app.put("/students/:id", async (req, res) => {
  const student = await db
    .collection("students")
    .updateOne({ _id: new ObjectId(req.params.id) }, { $set: req.body });
  res.status(200).json(student);
});

app.delete("/students/:id", async (req, res) => {
  const student = await db
    .collection("students")
    .deleteOne({ _id: req.params.id });
  res.status(200).json("Student deleted successfully");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
