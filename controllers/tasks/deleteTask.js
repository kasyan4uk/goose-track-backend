const { HttpError } = require("../../helpers");
const { Task } = require("../../models/task");

const deleteTaskById = async (req, res) => {
   const { id } = req.params;
   const { _id: owner } = req.user;

   const task = await Task.findById(id);

   if (!task) {
        throw HttpError(404, "Task not found");
   }

   if (task.owner.toString() !== owner.toString()) {
        throw HttpError(403, "Unauthorized");
   }

   const result = await Task.findByIdAndDelete(id);

   if (!result) {
        throw HttpError(404, "Task not found");
   }

   res.status(200).json({
      message: "Task deleted successfully"
   })
};

module.exports = deleteTaskById;



      