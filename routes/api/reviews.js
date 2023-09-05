const express = require("express");
const cntrl = require("../../controllers/reviews");

const { validation, authenticate } = require("../../middleware");

const { schemas } = require("../../models/review");

const router = express.Router();

// get all reviews 
router.get("/", cntrl.getAllReviews);

// get user's own review
router.get("/own", authenticate, cntrl.getOwnUserReview);

// add review
router.post("/own", authenticate, validation(schemas.addReviewSchema), cntrl.addReview);

// update own review
router.patch("/own", authenticate, validation(schemas.updateReviewSchema), cntrl.updateOwnUserReview);

// delete own review
router.delete("/own", authenticate, cntrl.deleteOwnUserReview);

module.exports = router;