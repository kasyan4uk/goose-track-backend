const { HttpError } = require("../../helpers");
const { Task } = require("../../models/task");

const getAllTasks = async (req, res, next) => {
    const { _id: owner } = req.user;
    
    const filterTask = {
        owner,
    }

    console.log( req.query)

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