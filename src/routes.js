const { addBook } = require("./handlers")

const routes = [
     {
          method: "POST",
          path: "/books",
          handler: addBook
     }
];

module.exports = { routes }