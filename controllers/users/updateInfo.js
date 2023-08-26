const { User } = require("../../models/user");

const updateName = async (req, res) => {
  const { _id } = req.user;
  const { name, email } = req.body;
  const user = await User.findByIdAndUpdate(_id, {name, email}, { new: true });

  console.log("user:",user);

  if (!user || user === null) {
    res.status(404).json({
      message: "Not found",
    });
    return;
  }

  res.status(200).json({
    message: "Success",
    name,
    email
  })
};

module.exports = updateName;