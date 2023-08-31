const { Schema, model } = require("mongoose");
const Joi = require("joi");

const { handleMongooseError } = require("../helpers");

const emailRegexp = /^([a-zA-Z0-9_\-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;

// matches: 38 (097) 256 34 77
const phoneRegexp = /^38 \(\d{3}\) \d{3} \d{2} \d{2}$/; 

// matches: 25/08/1995
const birthdayRegexp = /^(0[1-9]|1\d|2\d|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;

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
      type: String,
    },
    birthday: {
      type: String,
    },
    skype: {
      type: String,
    },
    avatarUrl: {
      type: String,
    },
    token: {
      type: String,
    },
    cloudinaryId: {
      type: String,
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
  phone: Joi.string().pattern(phoneRegexp).messages({   
    "string.empty": ` String is empty. Enter phone`,
    "string.pattern.base": "Phone is not valid",
  }),
  birthday: Joi.string().pattern(birthdayRegexp).messages({ 
    "string.empty": ` String is empty. Enter bithday`,
    "string.pattern.base": "Bithday is not valid",
  }),
  skype: Joi.string().messages({
    "string.empty": ` String is empty. Enter skype`,
  }),
  avatarUrl: Joi.string(),
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
