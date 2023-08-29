const authenticate = require("./authenticate");
const isValidId = require("./isvalidId");
const validateUpdate = require("./validateUpdate");
const validation = require("./validation");
const upload = require("./upload");
const passport = require("./passport");

module.exports = {
  validation,
  isValidId,
  validateUpdate,
  authenticate,
  upload,
  passport,
};