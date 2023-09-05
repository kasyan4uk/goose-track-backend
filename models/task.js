const Joi = require("joi");
const { Schema, model } = require("mongoose");
const { handleMongooseError } = require("../helpers");

const PRIORITY = ["low", "medium", "high"];
const STATUS = ["to-do", "in-progress", "done"];

// matches: valid 24-hour time in the format "HH:MM," where HH is between 00 and 23, and MM is between 00 and 59
const timeRegexp = /^([01]\d|2[0-3]):([0-5]\d)$/;

// matches:  the date format in the format "YYYY-MM-DD"
const dateRegexp = /[12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])/;


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
            match: timeRegexp,
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
            match: dateRegexp,
        },
        status: {
            type: String,
            required: [true, "Category is required"],
            enum: STATUS,
            default: STATUS[0],
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

const validateStartEndTime = (value, helpers) => {
        const start = helpers.state.ancestors[0].start; 
        if (start && value <= start) {
            return helpers.message('End time must be later than start time');
        }
        return value;
    };

const addTaskSchema = Joi.object({
    title: Joi.string().max(250).required().messages({
        "any.required": ` Missing required title field`,
        "string.max": `Title should have a maximum length of 250`,
        "string.empty": ` String is empty. Enter title`,
    }),
    start: Joi.string().pattern(timeRegexp).required().messages({
        "any.required": ` Missing required start field`,
        "string.pattern.base": "Time is not valid",
    }),
    end: Joi.string().pattern(timeRegexp).required().custom(validateStartEndTime).messages({
        "any.required": ` Missing required end field`,
        "string.pattern.base": "Time is not valid",
    }),
    priority: Joi.string().valid(...PRIORITY).required().messages({
        "any.required": ` Missing required priority field`,
        "string.empty": ` String is empty. Enter priority`,
        "any.only": 'Invalid priority. Allowed values are low, medium or high.',
    }),
    date: Joi.string().pattern(dateRegexp).required().messages({
        "any.required": ` Missing required date field`,
        "string.empty": ` String is empty. Enter date`,
        "string.pattern.base": "Date is not valid",
    }),
    status: Joi.string().valid(...STATUS).required().messages({
        "any.required": ` Missing required status field`,
        "string.empty": ` String is empty. Enter status`,
        "any.only": 'Invalid status. Allowed values are to-do, in-progress or done.',
    }),
});

const updateTaskSchema = Joi.object({
    title: Joi.string().max(250).messages({
        "string.max": `Title should have a maximum length of 250`,
        "string.empty": ` String is empty. Enter title`,
    }),
    start: Joi.string().pattern(timeRegexp).messages({
        "string.pattern.base": "Time is not valid",
    }),
    end: Joi.string().pattern(timeRegexp).custom(validateStartEndTime).messages({
        "string.pattern.base": "Time is not valid",
    }),
    priority: Joi.string().valid(...PRIORITY).messages({
        "string.empty": ` String is empty. Enter priority`,
        "any.only": 'Invalid priority. Allowed values are low, medium or high.',
    }),
    date: Joi.string().pattern(dateRegexp).messages({
        "string.empty": ` String is empty. Enter date`,
        "string.pattern.base": "Date is not valid",
    }),
    status: Joi.string().valid(...STATUS).messages({
        "string.empty": ` String is empty. Enter status`,
        "any.only": 'Invalid status. Allowed values are to-do, in-progress or done.',
        "any.invalid": "The following condition must be met start<end",
    }),
});

const schemas = { addTaskSchema, updateTaskSchema };

const Task = model("task", taskSchema);

module.exports = { Task, schemas };