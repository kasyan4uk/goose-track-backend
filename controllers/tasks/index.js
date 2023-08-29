const { ctrlWrapper } = require("../../helpers");

const addTask = require("./addTask");
const deleteTaskById = require("./deleteTask");
const getAllTasks = require("./getAllTasks");

module.exports = {
    addTask: ctrlWrapper(addTask),
    getAllTasks: ctrlWrapper(getAllTasks),
    deleteTaskById: ctrlWrapper(deleteTaskById),
};


