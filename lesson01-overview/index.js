const express = require("express");
const { sumFunction, multiply } = require("./math");
const fs = require("fs");

const numOne = 4,
  numTwo = 5;
const result = sumFunction(numOne, numTwo);
const mul = multiply(numOne, numTwo);

const app = express();
const PORT = 3001;

app.get("/", (req, res) => {
  res.send("This is first web service");
});

app.listen(PORT, () => {
  console.log(`My server is running at PORT=${PORT}`);
});

// console.log(`Sum between ${numOne} + ${numTwo} = ${result}`);
// console.log(`Mul between ${numOne} * ${numTwo} = ${mul}`);

// fs.readFile("./test.txt", "utf-8", (err, data) => {
//   if (err) {
//     console.error("Somethings went wrong", err);
//     return;
//   }
//   console.log("Data:", data);
// });
