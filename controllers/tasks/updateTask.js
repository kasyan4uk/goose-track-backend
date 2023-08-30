const { HttpError } = require("../../helpers");
const { Task } = require("../../models/task");

const updateTask = async (req, res) => {
    const { id } = req.params;

    const result = await Task.findByIdAndUpdate( id, req.body, {new: true});

    if(!result) {
        throw HttpError(404, "Not found");
    };

    res.status(200).json({
        message: "Success. Task edited successfully",
        taskData: result,
    })
};

module.exports = updateTask;