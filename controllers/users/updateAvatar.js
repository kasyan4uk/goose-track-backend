const { User } = require("../../models/user");

const updateAvatar = async (req, res) => {
  const { _id } = req.user;
  const avatar = req.file.path;

  console.log("req.file:", req.file);
  const user = await User.findByIdAndUpdate(_id, avatar, { new: true });

  if (!user || user === null) {
    res.status(404).json({
      message: "Not found",
    });
    return;
  }

  console.log("avatar:", avatar);

  res.status(200).json({
    message: "Success",
    userData: {
 
      avatar,
    }
  })
};

module.exports = updateAvatar;