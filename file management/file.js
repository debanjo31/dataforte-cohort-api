// import fs from "fs" - ESMODULE
const fs = require("fs");
const pdf = require("pdf-parse");

let dataBuffer = fs.readFileSync("./cv.pdf");

pdf(dataBuffer).then(function (data) {
  // number of pages
  console.log("Number of Pages", data.numpages);
  // number of rendered pages
  console.log("Number of rendered pages", data.numrender);
  // PDF info
  console.log("Data Info", data.info);
  // PDF metadata
  console.log("PDF METADATA", data.metadata);
  // PDF.js version
  // check https://mozilla.github.io/pdf.js/getting_started/
  console.log(data.version);
  // PDF text
  console.log(data.text);
  fs.writeFile("mycv.doc", data.text, (err, data) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log("File created");
  });
});

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

// function creatingFolderAndFile(foldername, fileName, filecontent) {
//   fs.mkdir(`${foldername}`, (err, data) => {
//     if (err) {
//       console.log(err);
//       return;
//     }
//     console.log("Folder created");
//   });
//   fs.writeFile(`./${foldername}/${fileName}`, filecontent, (err, data) => {
//     if (err) {
//       console.log(err);
//       return;
//     }
//     console.log("File created");
//   });
// }

// creatingFolderAndFile(
//   "sodiq",
//   "sodqi.txt",
//   "Name: Sodiq\nAge: 29\nLocation: Ondo"
// );

// \n - new line

//appending files
// fs.appendFile("./backend.txt", "\nSoftware Developer", (err, data) => {
//   if (err) {
//     console.log(err);
//     return;
//   }
//   console.log("File updated");
// });

//delete file
// fs.unlink("./backend.txt", (err, data) => {
//   if (err) {
//     console.log(err);
//     return;
//   }
//   console.log("File deleted");
// });
