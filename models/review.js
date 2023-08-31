const { Schema, model } = require("mongoose");
const Joi = require("joi");
const { handleMongooseError } = require("../helpers");

const reviewSchema = Schema(
  {
    stars: {
      type: Number,
      required: [true, "Set number of rating stars"],
      min: 1,
      max: 5,
      default: 0,
    },
    reviewText: {
      type: String,
      required: [true, "Add review"],
      default: "",
      description: "Review",
    },
    //
    name: {
      type: String,
      description: "Name of reviewer",
      // required: [true, "Set name for user"],
    },
    //
    // avatarUrl: { // avatarUrl не нужен ??
    //   type: String,
    //   default: "",
    //   description: "avatarUrl",
    // },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
      unique: true,
    },
  },
  { versionKey: false, timestamps: true }
);

reviewSchema.post("save", handleMongooseError);

const addReviewSchema = Joi.object({
  stars: Joi.number().required(),
  reviewText: Joi.string().required(),
  // avatarUrl: Joi.string(), // нужен??
});

const updateReviewSchema = Joi.object({
  stars: Joi.number()
  .min(0)
  .max(5)
  .integer()
  .required()
  .error(new Error("missing required review text field")),  
  //  нужно .required() ??

  reviewText: Joi.string()
    .required()
    .error(new Error("missing required review text field")),
});

const schemas = { addReviewSchema, updateReviewSchema };

const Review = model("review", reviewSchema);

module.exports = { Review, schemas };
