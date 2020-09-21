const express = require('express');
const router = express.Router();
const { check } = require("express-validator");

const authMiddleware = require('../middleware/Auth');
const userController = require('../controllers/users')

//@route    /api/auth
//@desc     Login after signup
//@access   Public
router.get('/', authMiddleware, userController.LoginByToken)

//@route    /api/auth
//@desc     login
//@access   Public
router.post(
    "/",
    [
      check("email", "Please enter a valid email").trim().isEmail(),
      check("password", "Password is required").trim().exists(),
    ],
    userController.Login
  );

module.exports = router;