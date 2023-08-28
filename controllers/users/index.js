const { ctrlWrapper } = require("../../helpers");
const getCurrent = require("./getCurrent");
const updateProfile = require("./updateProfile");

module.exports = {
  getCurrent: ctrlWrapper(getCurrent),
  updateProfile: ctrlWrapper(updateProfile),
};