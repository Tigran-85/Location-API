const { body } = require("express-validator");

const validationMessage = require("../validationMessage");

module.exports = [
  body("firstName")
    .trim()
    .not()
    .isEmpty()
    .withMessage(validationMessage.required)
    .isLength({ min: 3 })
    .withMessage(validationMessage.min(3)),

  body("lastName")
    .trim()
    .not()
    .isEmpty()
    .withMessage(validationMessage.required)
    .isLength({ min: 3 })
    .withMessage(validationMessage.min(3)),

  body("email").trim().isEmail().withMessage(validationMessage.email),

  body("password")
    .trim()
    .not()
    .isEmpty()
    .withMessage(validationMessage.required)
    .matches(/^(?=(.*?[A-Z]){1,}).{3,}$/)
    .withMessage("Min 1 uppercase letter")
    .matches(/^(?=(.*[a-z]){3,}).{3,}$/)
    .withMessage("Min 3 lowercase letter")
    .matches(/^(?=(.*[\d]){2,}).{2,}$/)
    .withMessage("Min 2 numbers")
    .matches(/^(?=(.*[\W]){1,}).{2,}$/)
    .withMessage("Min 1 special character"),
];
