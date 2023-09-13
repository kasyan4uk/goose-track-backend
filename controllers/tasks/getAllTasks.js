const { HttpError } = require("../../helpers");
const { Task } = require("../../models/task");

const getAllTasks = async (req, res, next) => {
    const { _id: owner } = req.user;
    const { year, month, day} = req.query;

    const currentDate = new Date();
    const currentYear = year || currentDate.getFullYear();
    const currentMonth = month || (currentDate.getMonth() + 1);

    const filterTask = {
        owner,
        date: { $regex: `^${currentYear}-0?${currentMonth}-${day ? day : '\\d{2}'}$` },
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