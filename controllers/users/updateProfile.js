const { User } = require("../../models/user");

const updateProfile = async (req, res) => {
  const { _id } = req.user;

  const avatarUrl = req.file.path;

  if (req.file) {
    const user = await User.findByIdAndUpdate(
      _id,
      { ...req.body, avatarUrl },
      {
        new: true,
      }
    );

    if (!user || user === null) {
      res.status(404).json({
        message: "Not found",
      });
      return;
    }
  }

  res.status(200).json({
    message: "Success",
    userData: {
      ...req.body,
      avatarUrl,
    },
  });
};

module.exports = updateProfile;
