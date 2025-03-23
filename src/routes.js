const { 
     addBook,
     getBook,
     getBookById
 } = require("./handlers")

const routes = [
     {
          method: "POST",
          path: "/books",
          handler: addBook
     },
     {
          method: "GET",
          path: "/books",
          handler: getBook
     },
     {
          method: "GET",
          path: "/books/{bookId}",
          handler: getBookById
     }
];

module.exports = { routes }