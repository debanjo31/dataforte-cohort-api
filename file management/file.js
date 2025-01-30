// import fs from "fs" - ESMODULE
const fs = require("fs");

// NODEJS give a tool called fs(File System) to work with files-
// -like read, write, update, delete, rename, etc.

//ReadFile - allows us to read the content of a file
// fs.readFile(path, options, callback)
// fs.readFile("./backend.txt", "utf8", (err, data) => {
//   if (err) {
//     console.log(err);
//     return;
//   }
//   console.log(data);
// });

// fs.readFile("./backend.txt", "utf8", (err, data) => {
//   if (err) {
//     console.log(err);
//     return;
//   } else {
//     console.log(data);
//   }
// });

//Write to file

// function writeFile(name) {
//   fs.writeFile("./backend.txt", name, (err, data) => {
//     if (err) {
//       console.log(err);
//       return;
//     }
//     console.log("File updated");
//   });
// }

// writeFile("DataForte Academy");

function creatingFolderAndFile(foldername, fileName, filecontent) {
  fs.mkdir(`${foldername}`, (err, data) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log("Folder created");
  });
  fs.writeFile(`./${foldername}/${fileName}`, filecontent, (err, data) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log("File created");
  });
}

creatingFolderAndFile(
  "sodiq",
  "sodqi.txt",
  "Name: Sodiq\nAge: 29\nLocation: Ondo"
);

// \n - new line
