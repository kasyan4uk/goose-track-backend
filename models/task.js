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
            required: [true, "Set time start"],
            match: /^([01]\d|2[0-3]):([0-5]\d)$/,
        },
        end: {
            type: String,
            required: [true, "Set time end"],
            validate: {
                validator: function (end) {
                    const startTime = this.start;
                    if (!startTime) return true;
                    return end > startTime;
                },
                message: "End time must be later than start time"
            },
        },
        priority: {
            type: String,
            required: [true, "Priority is required"],
            enum: PRIORITY,
            default: PRIORITY[0],
        },
        date: {
            type: String,
            required: [true, "Date is required"],
            match: /^\d{4}-\d{2}-\d{2}$/,
        },
        status: {
            type: String,
            required: [true, "Category is required"],
            enum: CATEGORY,
            default: CATEGORY[0],
        },
        owner: {
            type: Schema.Types.ObjectId,
            ref: "user",
            required: true,
        },
    },
    { versionKey: false, timestamps: true }
);

taskSchema.post("save", handleMongooseError);

const addTaskSchema = Joi.object({
    title: Joi.string().required(),
    start: Joi.string().required(),
    end: Joi.string().required(),
    priority: Joi.string().required(),
    date: Joi.string().required(),
    status: Joi.string().required(),
});

const updateTaskSchema = Joi.object({
    title: Joi.string(),
    start: Joi.string(),
    end: Joi.string(),
    priority: Joi.string(),
    date: Joi.string(),
    status: Joi.string(),
});

const schemas = { addTaskSchema, updateTaskSchema };

const Task = model("task", taskSchema);

module.exports = { Task, schemas }