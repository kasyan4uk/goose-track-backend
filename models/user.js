const { Schema, model } = require("mongoose");
const Joi = require("joi");

const { handleMongooseError } = require("../helpers");

const emailRegexp =
  /^([a-zA-Z0-9_\-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for user"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Set password for user"],
    },
    phone: {
      type: String
    },
    bithday: {
      type: String
    },
    skype: {
      type: String
    },
    avatarUrl: {
      type: String
    },
    token: {
      type: String
    },
    cloudinaryId: { 
      type: String
    },
  },
  { versionKey: false, timestamps: true }
);

userSchema.post("save", handleMongooseError);

const registerSchema = Joi.object({
  name: Joi.string().required().messages({
    "any.required": ` Missing required name field`,
    "string.empty": ` String is empty. Enter name`,
  }),
  email: Joi.string().pattern(emailRegexp).required().messages({
    "any.required": ` Missing required email field`,
    "string.empty": ` String is empty. Enter email`,
    "string.pattern.base": "Email is not valid",
  }),
  password: Joi.string().min(8).max(25).required().messages({
    "string.min": `Password should have a minimum length of 8`,
    "string.max": `Password should have a maximum length of 25`,
    "any.required": ` Missing required password field`,
    "string.empty": ` String is empty. Enter password`,
  }),
});

const loginSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required().messages({
    "any.required": ` Missing required email field`,
    "string.empty": ` String is empty. Enter email`,
    "string.pattern.base": "Email is not valid",
  }),
  password: Joi.string().min(8).max(25).required().messages({
    "string.min": `Password should have a minimum length of 8`,
    "string.max": `Password should have a maximum length of 25`,
    "any.required": ` Missing required password field`,
    "string.empty": ` String is empty. Enter password`,
  }),
});

const updateInfoSchema = Joi.object({
  name: Joi.string().min(4).optional().messages({
    "string.empty": ` String is empty. Enter name`,
  }),
  email: Joi.string().pattern(emailRegexp).optional().messages({
    "string.empty": ` String is empty. Enter email`,
    "string.pattern.base": "Email is not valid",
  }),
  phone: Joi.string().allow(null).allow('').optional().messages({
    "string.empty": ` String is empty. Enter phone`,
  }),
  bithday: Joi.string().allow(null).allow('').optional().messages({
    "string.empty": ` String is empty. Enter bithday`,
  }),
  skype: Joi.string().allow(null).allow('').optional().messages({
    "string.empty": ` String is empty. Enter skype`,
  }),
  avatarUrl: Joi.string().allow('').optional(),
});

const schemas = {
  registerSchema,
  loginSchema,
  updateInfoSchema,
};

const User = model("user", userSchema);

module.exports = {
  User,
  schemas,
};
