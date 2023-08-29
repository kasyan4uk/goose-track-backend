const { ctrlWrapper } = require("../../helpers");

const addTask = require("./addTask");
const deleteTaskById = require("./deleteTask");
const getAllTasks = require("./getAllTasks");
const updateTask = require("./updateTask");

module.exports = {
    addTask: ctrlWrapper(addTask),
    getAllTasks: ctrlWrapper(getAllTasks),
    deleteTaskById: ctrlWrapper(deleteTaskById),
    updateTask: ctrlWrapper(updateTask),
};



