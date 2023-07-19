const { sum, multiply } = require("./sum");
const fs = require("fs");

const a = 10;
const b = 5;
console.log("Sum:", sum(a, b));
console.log("Mul:", multiply(a, b));

const content = "Hello, world!";
fs.writeFile("test.txt", content, (err) => {
  if (err) {
    console.error(err);
  }
  console.log("Successfully");
});
