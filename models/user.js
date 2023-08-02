const { Schema, model } = require("mongoose");

const { handleMongooseError } = require("../helpers");

const Joi = require('joi');

const userSchema = new Schema({
    password: {
        type: String,
        required: [true, 'Set password for user'],
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
    },
    subscription: {
        type: String,
        enum: ["starter", "pro", "business"],
        default: "starter"
    },
    token: String,
}, { versionKey: false, timestamps: true });

userSchema.post('save', handleMongooseError);

const registerSchema = Joi.object({
    password: Joi.string()
        .pattern(/^[a-zA-Z0-9!@#$%&*]{8,25}$/,
        )
        .required(),
    email: Joi.string()
        .pattern(
            /^([a-zA-Z0-9_\-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/,
        )
        .required(),
    subscription: Joi.string(),
});

const loginSchema = Joi.object({
    password: Joi.string()
        .pattern(/^[a-zA-Z0-9!@#$%&*]{8,25}$/,
        )
        .required(),
    email: Joi.string()
        .pattern(
            /^([a-zA-Z0-9_\-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/,
        )
        .required(),
});

const schemas = {
    registerSchema,
    loginSchema,
};

const User = model('user', userSchema);

module.exports = {
    User,
    schemas,
};