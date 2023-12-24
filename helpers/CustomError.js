const createError = require("http-errors");

const CustomError = (status, message = undefined) => {
  return createError(status, message);
};

module.exports = CustomError;
