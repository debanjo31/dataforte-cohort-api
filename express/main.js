//INTRODUCTION TO EXPRESS
//EXPRESS INSTALLATION
//ROUTING IN EXPRESS
//REQUEST AND RESPONSE IN EXPRESS
//EXPRESS REQUEST METHODS AND STATUS CODE
//EXPRESS --WATCH

import express from "express";
import { body } from "express-validator";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const port = 8080;

//array - pop(), push(), shift(), unshift(), splice(), slice(), map(), filter(), find(), findIndex(), reduce(), forEach()
const db = {
  users: [
    {
      id: 1,
      name: "Israel Seyi",
      email: "seyi@gmail.com",
      age: 20,
    },
    {
      id: 2,
      name: "Debanjo Yusuf",
      email: "yusuf@gmail.com",
      age: 20,
    },
    {
      id: 3,
      name: "Chidi Emmanuel",
      email: "chidi@gmail.com",
      age: 20,
    },
  ],
  products: [
    {
      id: 1,
      name: "Macbook",
      price: 1000,
    },
    {
      id: 2,
      name: "Dell",
      price: 800,
    },
    {
      id: 3,
      name: "HP",
      price: 700,
    },
  ],
};

app.get("/", (req, res) => {
  res.send("Welcome to our API");
});

app.get("/users", (req, res) => {
  res.json(db.users);
});

//req.params
// /users/:id
app.get("/users/:id", (req, res) => {
  const id = req.params.id;
  console.log(req.params);
  // const {id} = req.params
  const user = db.users.find((user) => user.id === parseInt(id));
  // const user = db.findById(id) - mongodb

  if (user) {
    res.json(user);
  } else {
    res.status(404).json({
      message: "user not found",
    });
  }
});

//update user information
app.put("/users/:id", (req, res) => {
  const id = req.params.id;
  const { age } = req.body;

  const user = db.users.find((user) => user.id === parseInt(id));
  if (user) {
    user.age = age;
    res.json(user);
  } else {
    res.status(404).json({
      message: "user not found",
    });
  }
});

//add user
app.post("/users", (req, res) => {
  const { id, name, email, age } = req.body;
  // if (!id || !name || !email || !age) {
  //   res.status(400).json({
  //     message: "Kindly provide all required fields",
  //   });
  // }
  //using body validation

  body("id").isNumeric();
  body("name").isString();
  body("email").isEmail();
  body("age").isNumeric();
  //check if id exist
  const userExist = db.users.find((user) => user.id === parseInt(id));
  if (userExist) {
    res.status(400).json({
      message: "User with this id already exists",
    });
  }
  //check if email exist
  const userEmailExist = db.users.find((user) => user.email === email);
  if (userEmailExist) {
    res.status(400).json({
      message: "User with is Email already exists",
    });
  }
  const user = { id, name, email, age };
  db.users.push(user);
  //   db.save()
  res.json(user);
});

app.get("/products", (req, res) => {
  res.json(db.products);
});

app.get("/products/:id", (req, res) => {
  const { id } = req.params;
  const product = db.products.find((product) => product.id === parseInt(id));
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({
      message: "product not found",
    });
  }
});

app.listen(port, () => {
  console.log(`Server is now running on port ${port}`);
});

// const {data } = await axios.get("locahos:/users")

// data.map((user) => {
//     user.name, user.age
// })
