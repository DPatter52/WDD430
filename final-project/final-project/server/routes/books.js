var express = require("express");
var router = express.Router();
const sequenceGenerator = require("./sequenceGenerator");
const Book = require("../models/book");

router.get("/", async (req, res, next) => {
  Book.find()
    .then((books) => {
      res.status(200).json({
        message: "Books fetched successfully!",
        books: books,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ title: "An exception occurred", err });
    });
});

router.post("/", async (req, res, next) => {
  const maxBookId = sequenceGenerator.nextId("books");

  const book = new Book({
    id: maxBookId,
    name: req.body.name,
    desciption: req.body.desciption,
    imageUrl: req.body.imageUrl,
  });

  try{
    const createdBook = await book.save();
    
      res.status(201).json({
        message: "Book added successfully",
        book: createdBook,
      
      });
    }catch(error) {
      res.status(500).json({
        message: "An error occurred",
        error: error,
      });
    }
    });


router.put("/:id", (req, res, next) => {
  Book.findOne({ id: req.params.id })
    .then((book) => {
      book.name = req.body.name;
      book.description = req.body.description;
      book.imageUrl = req.body.imageUrl;

      Book.updateOne({ id: req.params.id }, book)
        .then((result) => {
          res.status(204).json({
            message: "Book updated successfully",
          });
        })
        .catch((error) => {
          res.status(500).json({
            message: "An error occurred",
            error: error,
          });
        });
    })
    .catch((error) => {
      res.status(500).json({
        message: "Book not found.",
        error: { book: "Book not found" },
      });
    });
});

router.delete("/:id", (req, res, next) => {
  Book.findOne({ id: req.params.id })
    .then((book) => {
      Book.deleteOne({ id: req.params.id })
        .then((result) => {
          res.status(204).json({
            message: "Book deleted successfully",
          });
        })
        .catch((error) => {
          res.status(500).json({
            message: "An error occurred",
            error: error,
          });
        });
    })
    .catch((error) => {
      res.status(500).json({
        message: "Book not found.",
        error: { book: "Book not found" },
      });
    });
});

module.exports = router;
