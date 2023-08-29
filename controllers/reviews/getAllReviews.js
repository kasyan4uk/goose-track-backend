const { Review } = require("../../models/review");
const { HttpError } = require("../../helpers");

const getAllReviews = async (req, res, next) => {
    const reviews = await Review.find();

    if (!reviews) { 
        throw HttpError(404, "Reviews are not found");
    }

    res.status(200).json({
      message: "Successfully",
      code: 200,
      reviews: reviews,
      total: reviews.length,
    });
};

module.exports = getAllReviews;