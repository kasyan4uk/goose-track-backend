const Joi = require("joi");
const { Schema, model } = require("mongoose");
const { handleMongooseError } = require("../helpers");

const PRIORITY = ["low", "medium", "high"];
const CATEGORY = ["to-do", "in-progress", "done"];

const taskSchema = Schema(
    {
        title: {
            type: String,
            required: [true, "Set task title"],
            maxlength: 250,

        },
        start: {
            type: String,
        },
        end: {
            type: String,
        },
        priority: {
            type: String,
        },
        date: {
            type: String,
        },
        category: {
            type: String,
        },
        owner: {
            type: Schema.Types.ObjectId,
            ref: "user",
            required: true,
            unique: true,
        },
    },
    { versionKey: false, timestamps: true }
);

taskSchema.post("save", handleMongooseError);