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
          console.info("Book successfully pushed")
          console.log(Bookshelf)

          return h.response({
               status: "success",
               message: "Buku berhasil ditambahkan",
               data: {
                    bookId: bookId
               }
          }).code(201)

     } catch (err) {

          console.error(`Failed at ${err.at}, message: ${err.message}`)

          return h.response({
               status: err.status,
               message: err.message
          }).code(err.code)

     }
}

module.exports = { addBook }