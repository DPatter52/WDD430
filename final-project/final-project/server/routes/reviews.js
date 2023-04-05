var express = require("express");
var router = express.Router();
const sequenceGenerator = require("./sequenceGenerator");
const Review = require("../models/review");

router.get("/", async (req, res, next) => {
  Review.find()
    .then((reviews) => {
      res.status(200).json({
        message: "Reviews fetched successfully!",
        reviews: reviews,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ title: "An exception occurred", err });
    });
});

router.post("/", async (req, res, next) => {
  const maxReviewId = sequenceGenerator.nextId("reviews");

  const review = new Review({
    id: maxReviewId,
    book: req.body.book,
    msgText: req.body.msgText,
    sender: req.body.sender,
    date: req.body.date
  });

  review
    .save()
    .then((createdReview) => {
      res.status(201).json({
        review: "Review added successfully",
        review: createdReview,
      });
    })
    .catch((error) => {
      res.status(500).json({
        review: "An error occurred",
        error: error,
      });
    });
});

router.put("/:id", (req, res, next) => {
  Review.findOne({ id: req.params.id })
    .then((review) => {
      review.book = req.body.book;
      review.msgText = req.body.msgText;
      review.sender = req.body.sender;
      review.date = req.body.date;

      Review.updateOne({ id: req.params.id }, review)
        .then((result) => {
          res.status(204).json({
            review: "Review updated successfully",
          });
        })
        .catch((error) => {
          res.status(500).json({
            review: "An error occurred",
            error: error,
          });
        });
    })
    .catch((error) => {
      res.status(500).json({
        review: "Review not found.",
        error: { review: "Review not found" },
      });
    });
});

router.delete("/:id", (req, res, next) => {
  Review.findOne({ id: req.params.id })
    .then((review) => {
      Review.deleteOne({ id: req.params.id })
        .then((result) => {
          res.status(204).json({
            review: "Review deleted successfully",
          });
        })
        .catch((error) => {
          res.status(500).json({
            review: "An error occurred",
            error: error,
          });
        });
    })
    .catch((error) => {
      res.status(500).json({
        review: "Review not found.",
        error: { review: "Review not found" },
      });
    });
});

module.exports = router;
