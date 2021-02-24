const express = require('express');
const router = express.Router();
const {Book, validateBook} = require("../models/books")



// POST Create a new BOOK
router.post('/', async (req, res) => {
    const error = await validateBook(req.body);
    if(error.message) res.status(400).send(error.message);

    const book = new Book({
        name: req.body.bookName,
        author: {
            name: req.body.authorName,
            age: req.body.authorAge,
        },
        genre: req.body.genre,
    });
    book.save().then(book => {
        res.status(201).send(book);
    }).catch(error => {
        res.status(500).send("Book was not stored in the database");
    });
});


// GET: Get all books
router.get("/", (req, res) => {
    Book.find().then((books) => res.send(books)).catch(error => {
        res.status(500).send("Something went wrong");
        console.log(error);
    });
});

// Get the book by ID
router.get("/:bookId",(req, res) => {
    const myBook = Book.findById(req.params.bookId);

    if(!myBook) res.status(404).send("Book Not Found");
    res.send(myBook);
})

// Update Book based on Id
router.put('/:bookId', async (req, res) => {
    const updateBook = await Book.findByIdAndUpdate(req.params.bookId, {
        name: req.body.bookName,
        author: {
            name: req.body.authorName,
            age: req.body.authorAge
        },
        genre: req.body.genre
    }, {new: true});
    if(!updateBook) res.status(404).send("Book Not found");
    res.send(updateBook);

})

// DELETE BOOK BASED ON ID
router.delete('/:bookId', async (req, res) => {
    const deleteBook = await Book.findIdAndRemove(req.params.bookId);
    if(!deleteBook) res.status(404).send('this book is not found');
    res.send(deleteBook);
})

module.exports = router;