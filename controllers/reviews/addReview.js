const { Review } = require("../../models/review");

const addReview = async (req, res) => {
    const { _id: owner } = req.user;
    const result = await Review.create({ ...req.body, owner });

    res.status(201).json({
        message: "Successfully",
        code: 201,
        data: { result },
    });
};

module.exports = addReview;