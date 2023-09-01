const { HttpError } = require("../../helpers");
const { Task } = require("../../models/task");

const deleteTaskById = async (req, res) => {
   const { id } = req.params;
   const { owner } = req.user;

   const result = await Task.findByIdAndDelete(id);

   if(!result || !owner) {
        throw HttpError(404, "Not found")
   }

   res.status(200).json({
        message: "Task deleted successfully"
})
};

module.exports = deleteTaskById;