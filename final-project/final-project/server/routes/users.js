var express = require("express");
var router = express.Router();
const sequenceGenerator = require("./sequenceGenerator");
const User = require("../models/user");

router.get('/', async (req, res, next) => {
  try {
     const users = await User.find();
     return res.status(200).json({ users });
  } catch (error) {
     return res.status(500).json({ error });
  }
});

router.post("/", async (req, res, next) => {
  const maxUserId = sequenceGenerator.nextId("users");

  const user = new User({
    id: maxUserId,
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    imageUrl: req.body.imageUrl,
    group: req.body.group,
  });

  user
    .save()
    .then((createduser) => {
      res.status(201).json({
        message: "user added successfully",
        user: createduser,
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: "An error occurred",
        error: error,
      });
    });
});

router.put("/:id", (req, res, next) => {
  User.findOne({ id: req.params.id })
    .then((user) => {
      user.name = req.body.name;
      user.email = req.body.email;
      user.phone = req.body.phone;
      user.imageUrl = req.body.imageUrl;
      user.group = req.body.group;
      

      User.updateOne({ id: req.params.id }, user)
        .then((result) => {
          res.status(204).json({
            message: "User updated successfully",
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
        message: "User not found.",
        error: { user: "User not found" },
      });
    });
});

router.delete("/:id", (req, res, next) => {
  User.findOne({ id: req.params.id })
    .then((user) => {
      User.deleteOne({ id: req.params.id })
        .then((result) => {
          res.status(204).json({
            message: "User deleted successfully",
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
        message: "User not found.",
        error: { user: "User not found" },
      });
    });
});

module.exports = router;
