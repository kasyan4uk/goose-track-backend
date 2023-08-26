const { Review } = require("../../models/review");
const { HttpError } = require("../../helpers");

const getOwnUserReview = async (req, res) => {
    const owner = req.user?._id;

    if (!owner) { 
        throw HttpError(400, "Owner of review is missing");
    }

    const review = await Review.find({ owner }).populate(
        "owner",
        "_id name avatarUrl"
    );

    if (!review) { 
        throw HttpError(404, "Review is not found")
    }
    
    res.status(200).json({
       message: "Successfully",
       code: 200,
       data: review,
    });
};

module.exports = getOwnUserReview;
