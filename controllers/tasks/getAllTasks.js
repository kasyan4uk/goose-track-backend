const { HttpError } = require("../../helpers");
const { Task } = require("../../models/task");

const getAllTasks = async (req, res, next) => {
    const { _id: owner } = req.user;
    const { year, month } = req.query;
    
    const filterTask = {
        owner,
    }

    if (year && month) {
        filterTask.date = { $regex: `^${year}-0?${month}-\\d{2}$` };
    } 

    const tasks = await Task.find(filterTask).populate("owner", "name avatarUrl");

    if(!tasks) {
        throw HttpError(404, "Not found")
    }

    res.status(200).json({
        message: "Success",
        total: tasks.length,
        tasks,
    })
};

module.exports = getAllTasks;