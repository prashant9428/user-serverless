const { validationResult } = require("express-validator");

module.exports.validationHandler = (handler) => {
  const errors = validationResult(handler);
  if (!errors.isEmpty()) {
    const err = new Error("Validation Error Messages");
    err.status = 422;
    err.validation = errors.array();
    throw err;
  }
};
