const { ctrlWrapper } = require("../../helpers");

const getAllReviews = require("./getAllReviews");
const getOwnUserReview = require("./getOwnUserReview");
const addReview = require("./addReview");
const updateOwnUserReview = require("./updateOwnUserReview");
const deleteOwnUserReview = require("./deleteOwnUserReview");

module.exports = {
  getAllReviews: ctrlWrapper(getAllReviews),
  getOwnUserReview: ctrlWrapper(getOwnUserReview),
  addReview: ctrlWrapper(addReview),
  updateOwnUserReview: ctrlWrapper(updateOwnUserReview),
  deleteOwnUserReview: ctrlWrapper(deleteOwnUserReview),
};
