// const { HttpError } = require("../../helpers");
const { Task } = require("../../models/task");

const addTask = async (req, res) => {

    const { _id: owner } = req.user;
    const taskData = req.body

    const task = await Task.create({ ...taskData, owner});

    res.status(200).json({
      message: "Successfully added task",
      task,
    });
  };

module.exports = addTask;