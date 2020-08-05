const valid = require("express-validator");
const User = require("../models/user");

exports.userValidation = [
  valid
  .body("firstname", "Firstname is missing")
  .exists()
  .not()
  .isEmpty()
  .withMessage("Firstname is required")
  .isAlpha()
  .withMessage("Number and special characters are not required"),
  valid
  .body("lastname", "lastname is missing")
  .exists()
  .not()
  .isEmpty()
  .withMessage("lastname is required")
  .isAlpha()
  .withMessage("Number and special characters are not required"),
  valid
  .body("password", "Password is missing")
  .exists()
  .isLength({
    min: 8,
  })
  .withMessage("password must be 8 characters long")
  .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])/, "i")
  .withMessage("Password must include one lowercase character, one uppercase character,a number,and a special character."),

  valid
  .body("confirm-password", "confirm password feild is missing")
  .exists()
  .custom((value, {
    req
  }) => {
    if (value !== req.body.password) {
      throw new Error("Password confirmation does not match password");
    }
    // Indicates the success of this synchronous custom validator
    return true;
  }),

  valid
  .body("email", "Email felid is missing")
  .exists()
  .not()
  .isEmpty()
  .isEmail()
  .withMessage("Email is invalid")
  .custom(async (value) => {
    const email = await User.findOne({
      where: {
        email: value
      }
    });
    if (email) {
      throw new Error("Email is already in use");
    }
    return true;
  }),
];

exports.loginValidation = [
  valid
  .body("email", "email is missing")
  .exists()
  .not()
  .isEmpty()
  .withMessage("email is required")
  .isEmail()
  .withMessage("Invalid email"),

  valid
  .body("password", "password is missing")
  .exists()
  .not()
  .isEmpty()
  .withMessage("Password is required"),
];