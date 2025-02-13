import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import session from "express-session";
import parseurl from "parseurl";
import multer from "multer";
const app = express();
const PORT = 5050;

const upload = multer({ dest: "uploads/" });

//cloudinary, aws s3 buck, google cloud storage
// Middleware functions are functions that have access to the request object (req),
// the response object (res), and the next middleware function in the application’s request-response cycle.
//  These functions are used to modify req and res objects for tasks like parsing request bodies,
// adding response headers

// perform function - authentication, chnaging
// /home

//get date and time the request was made

//authentication
//authourization

//Third Party Middleware
//cors - cross origin resource sharing - restricting ip address that can access the api, *, api.paystack.co
//helmet - secure the api
//body-parser - parse the body of the request
//multer - file upload, multipart form data
//morgan - log the request
//cookie-parser - parse the cookie
//express-session - session management
//express-validator - validate the request, JOI - validate the request
//express-rate-limit - limit the number of request, 15 request per minute
//express-slow-down

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
  })
);

app.use(function (req, res, next) {
  if (!req.session.views) {
    req.session.views = {};
  }

  //res.session.user
  // get the url pathname
  var pathname = parseurl(req).pathname;

  // count the views
  req.session.views[pathname] = (req.session.views[pathname] || 0) + 1;

  //if session is greater than 10, destroy the session and tell users login again
  if (req.session.views[pathname] > 10) {
    req.session.destroy();
    res.status(400).send("Session has expired, please login again");
    return;
  }

  next();
});

app.post("/profile", upload.single("avatar"), function (req, res) {
  // req.file is the `avatar` file
  console.log(req.file, "req.file");
  console.log(req.body, "req.body");

  res.send("File uploaded successfully");
  // req.body will hold the text fields, if there were any
});

app.get("/foo", function (req, res, next) {
  console.log(req.session);
  res.send("you viewed this page " + req.session.views["/foo"] + " times");
});

app.get("/bar", function (req, res, next) {
  res.send("you viewed this page " + req.session.views["/bar"] + " times");
});

// app.use((req, res, next) => {
//   console.log(`Request was made at ${Date.now()}`);
//   //api should work between 12pm and 5pm
//   let date = new Date();
//   let hours = date.getHours();
//   //0 -23 hours
//   console.log(hours);
//   if (hours >= 12 && hours <= 17) {
//     console.log("API is still available");
//     next();
//   } else {
//     res.status(400).send("The API is only available between 12pm and 5pm");
//     return;
//   }

//   //AUthorization, if user send bearer token, cookies
// });

app.use((req, res, next) => {
  console.log("This is the second middleware");
  next();
});

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
