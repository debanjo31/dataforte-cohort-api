const express = require("express");

const app = express();
const port = 5000;

// app.get(route, callback)
// .get -method
//.post - method
//.put - method
//app.all, app.use
app.put("/", (req, res) => {
  res.send("PUT requested");
});

app.get("/", (req, res) => {
  //fetch users from database, map, throught the data and send only name and age
  res.send("Hello World!");
});

app.patch("/user/:id", (req, res) => {
  //fetch user with particular id from database and update the user
  res.send("user updated");
});
// app.post("/", (req, res) => {
//   res.send("Got a POST request");
// });

// app.get("/users", (req, res) => {
//   console.log(req, "req file");
//   res.send("Got a GET request at /users");
// });

// app.post("/users", (req, res) => {
//   console.log(req, "req body");
//   res.send("User added to the database");
// });

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
