const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");
const jwt = require("jsonwebtoken");
const config = require("config");
const jwtSecretKey = config.get("JWT_SECRET_KEY");

const User = require("../models/User");

exports.RegisterUser = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({
      errors: errors.array().map((i) => i.msg),
      message: "Validation failed!",
    });
  }

  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(500).json({ errors: [{ msg: "User already exists" }] });
    } else {
      const avatar = gravatar.url(email, {
        s: "200",
        r: "pg",
        d: "mm",
      });

      const salt = await bcrypt.genSalt(12);

      const hashedPwd = await bcrypt.hash(password, salt);
      const user = new User({
        name,
        email,
        avatar,
        password: hashedPwd,
      });
      await user.save();

      jwt.sign(
        {
          id: user.id,
        },  
        jwtSecretKey,
        {
          expiresIn: "10000h",
        },
        (err, token) => {
          if (err) {
            return res
              .status(400)
              .json({ errors: [{ msg: "Unable to create token" }] });
          }
          return res.status(201).json({ token });
        }
      );
    }
  } catch (err) {
    return res.status(400).json({ errors: err.message });
  }
};

exports.LoginByToken = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId).select("-password");
    if (!user) {
      return res.status(404).json({ msg: "User not found." });
    }
    return res.status(200).json({ user });
  } catch (err) {
    return res.status(500).json({ msg: "Server error" });
  }
};

exports.Login = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({
      errors: errors.array().map((i) => i.msg),
      message: "Validation failed!",
    });
  }

  const { email, password } = req.body;
  try { 
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({errors: [{ msg: "Wrong email or password." }]});
    }
    const isPwdEqual = await bcrypt.compare(password, user.password);
    if (!isPwdEqual) {
      return res.status(403).json({errors: [{ msg: "Wrong email or password." }]});
    }

    jwt.sign(
      {
        id: user.id,
      },
      jwtSecretKey,
      {
        expiresIn: "10000h",
      },
      (err, token) => {
        if (err) {
          return res
            .status(400)
            .json({ errors: [{ msg: "Unable to create token" }] });
        }
        return res.status(201).json({ token });
      }
    );
  } catch (err) {
    return res.status(500).json({ msg: "Server error" });
  }
};
