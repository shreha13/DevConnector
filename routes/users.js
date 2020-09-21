const express = require("express");
const router = express.Router();
const { check } = require("express-validator");

const userController = require("../controllers/users");

//@route    /api/Users
//@desc     signup
//@access   Public
router.post(
  "/",
  [
    check("name", "Name is required").not().isEmpty(),
    check("email", "Please enter a valid email").trim().isEmail(),
    check("password", "Please enter a password with 6 or more characters")
      .trim()
      .isLength({ min: 6 }),
  ],
  userController.RegisterUser
);

module.exports = router;
