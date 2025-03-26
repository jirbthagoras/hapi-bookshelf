const { 
     addBook,
     getBook,
     getBookById,
     updateBook,
     deleteBook
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
     },
     {
          method: "PUT",
          path: "/books/{bookId}",
          handler: updateBook
     },
     {
          method: "DELETE",
          path: "/books/{bookId}",
          handler: deleteBook
     }
];

module.exports = { routes }