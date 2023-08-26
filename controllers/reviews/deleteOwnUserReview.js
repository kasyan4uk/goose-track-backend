const { HttpError } = require("../../helpers");
const { Review } = require("../../models/review");

const deleteOwnUserReview = async (req, res) => {
    const owner = req.user?._id;

    if (!owner) { 
        throw HttpError(400, "Owner of review is missig");
    }

    const review = await Review.findOneAndRemove({ owner });

    if (!review) { 
        throw HttpError(404, "Review to delete is not found");
    }

    res.status(200).json({
      message: "Review is deleted successfully",
      code: 200,
    });
};

module.exports = deleteOwnUserReview;