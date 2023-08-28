const { ctrlWrapper } = require("../../helpers");

const addTask = require("./addTask");

module.exports = {
    addTask: ctrlWrapper(addTask),
};