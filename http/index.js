// BASIC HTTP SERVER

//Http module in jodejs allows us to create web server and handles http request and response (GET, POST, PUT, DELETE etc)
//Its built in nodejs so no need to install it

//To include http module, use require() method
//localhost:5000 return "Hello World"

//sever reponse code

const http = require("http");
const https = require("https");
const url = require("url");
const fs = require("fs");
const path = require("path");

// const server = http.createServer((req, res) => {
//   //return json response
//   res.setHeader("Content-Type", "application/json");
//   res.writeHead(200);
//   res.end(JSON.stringify({ message: "Hello World" }));
// });

// const server = http.createServer((req, res) => {
//   //   console.log(req, "request");
//   console.log(req.url, "url");
//   console.log(req.method, "method");
//   if (req.url === "/about") {
//     res.end("The about page");
//   }
//   if (req.url === "/contact") {
//     // const { name, email, phone } = req.body;
//     // console.log(req, "body - request");
//     //get request body
//     let body = [];
//     req.on("data", (chunk) => {
//       body += chunk.toString();
//     });
//     req.on("end", () => {
//       console.log(body, "body");
//     });

//     //save body into DB

//     //save on the database
//     res.end("The contact page");
//   }
//   if (req.url === "/") {
//     res.end("The home page");
//   }
// });

// const server = http.createServer((req, res) => {
//   console.log(req.url, "url");
//   console.log(req.method, "method");
//   if (req.url === "/login" && req.method === "POST") {
//     //get request body
//     //verify the password with whats in the database
//     //if password in incorrect, send a 401 status code
//     //if password is correct, send a 200 status code with a success message and user token
//     res.end("The login page");
//   } else if (req.url === "/profile" && req.method === "GET") {
//     //get user details from db
//     res.end("The profile page");
//   } else if (req.url === "/update-profile" && req.method === "PUT") {
//     //update user profile
//     res.end("The update profile page");
//   } else {
//     res.end("Page not found");
//   }
// });

//get parameters
// const server = http.createServer((req, res) => {
//   console.log(req.url, "url");
//   const parsedUrl = url.parse(req.url, true);
//   console.log(parsedUrl, "parsedUrl");
//   console.log(parsedUrl.query, "query");
//   const query = parsedUrl.query;
//   res.end("The home page");
// });

// const server = http.createServer((req, res) => {
//   res.writeHead(200, {
//     "Content-Type": "application/json",
//   });
//   res.end(JSON.stringify({ message: "Hello World" }));
// });

//return html
// const server = http.createServer((req, res) => {
//   res.writeHead(200, {
//     "Content-Type": "text/html",
//   });
//   res.end("<div><h1>Hello World</h1> <p>This is a paragraph</p></div>");
// });

// nextjs

//append server to listen to port 5000

const server = http.createServer((req, res) => {
  const filePath = path.join(__dirname, "index.html");
  fs.readFile(filePath, (err, data) => {
    if (err) {
      const errFile = path.join(__dirname, "custom-error.html");
      fs.readFile(errFile, (err, data) => {
        res.writeHead(404, {
          "Content-Type": "text/html",
        });
        res.end(data);
      });
    } else {
      res.writeHead(200, {
        "Content-Type": "text/html",
      });
      res.end(data);
    }
  });
});

server.listen(5050, () => {
  console.log("NORMAL HTTP Server is running on port 5050");
});

// const options = {
//   key: fs.readFileSync("key.pem"),
//   cert: fs.readFileSync("cert.pem"),
// };

// PEM - PRIVACY ENHANCED MAIL FILE- sharing and storing encrypted data
// SSL/TLS ENCRYPTION

// https.createServer(options, (req, res) => {
//   res.end("Hello World");
// });

// httpsServer.listen(5051, () => {
//   console.log("HTTPS Server is running on port 5051");
// });
