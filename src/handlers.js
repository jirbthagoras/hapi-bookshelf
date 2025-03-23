let { Bookshelf } = require("./bookshelf")
const { nanoid } = require("nanoid")

const addBook = (request, h) => {
     const {
          name,
          year,
          author,
          summary,
          publisher,
          pageCount,
          readPage,
          reading
     } = request.payload
     console.debug("Variable successfully parsed")

     try {
          if (!name) {
               throw {
                    status: "fail",
                    message: "Gagal menambahkan buku. Mohon isi nama buku",
                    code: 400,
                    at: "validation"
               }
          }

          if (readPage > pageCount) {
               throw {
                    status: "fail",
                    message: "Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount",
                    code: 400,
                    at: "validation"
               }
          }

          const date = new Date().toISOString()
          console.debug("Date created")
          
          const book = {
               "id": bookId = nanoid(16),
               "name": name,
               "year": year,
               "author": author,
               "summary": summary,
               "publisher": publisher,
               "pageCount": pageCount,
               "readPage": readPage,
               "finished": (readPage == pageCount) ? true : false,
               "reading": reading,
               "insertedAt": date,
               "updatedAt": date,
          }
          console.debug("Book created, ID initialized")

          Bookshelf.push(book)
          console.info("Book successfully pushed \n")

          return h.response({
               status: "success",
               message: "Buku berhasil ditambahkan",
               data: {
                    bookId: bookId
               }
          }).code(201)

     } catch (err) {

          console.error(`Failed at ${err.at}, message: ${err.message}\n`)

          return h.response({
               status: err.status,
               message: err.message
          }).code(err.code)

     }
}

const getBook = (request, h) => {
     let filteredBooks = Bookshelf

     const {
          reading,
          finished,
          name,
     } = request.query

     console.debug("Book data returned")
     console.log(filteredBooks)

     if (reading === "1" || reading === "0") {
          const readingValue = reading === "1";
      
          filteredBooks = filteredBooks.filter((item) => item.reading === readingValue);
      
          console.debug("Book filtered by reading");
      }

     if (finished === "1" || finished === "0") {
          const finishedValue = finished === "1";
      
          filteredBooks = filteredBooks.filter((item) => item.finished === finishedValue);
      
          console.debug("Book filtered by finished");
      }

     if(name) {
          const searchQuery = name.toLowerCase()

          filteredBooks = filteredBooks.filter((item) => {
               return item.name.toLowerCase().includes(searchQuery)
          })
          console.debug("Book filtered by name")
     }

     let books = []

     filteredBooks.forEach((item) => {
          books.push({
               id: item.id,
               name: item.name,
               publisher: item.publisher
          })
     })

     console.log("Return successfull \n")
     return h.response({
          status: "success",
          data: {
               books: books
          }
     })
}

const getBookById = (request, h) => {
     const { bookId } = request.params

     console.log(Bookshelf)

     try {
          const searchedBook = Bookshelf.find((book) => {
               return book.id == bookId
          })
          console.debug("Book searched")

          if (!searchedBook) {
               throw {
                    status: "fail",
                    message: "Buku tidak ditemukan",
                    code: 404,
                    at: "search"
               }
          }

          return h.response({
               status: "success",
               data: {
                    book: searchedBook
               }
          }).code(200)

     } catch (err) {
          console.error(`Failed at ${err.at}, message: ${err.message}\n`)

          return h.response({
               status: err.status,
               message: err.message,
          }).code(err.code)
     }
}

module.exports = { addBook, getBook, getBookById }