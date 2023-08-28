const { User } = require("../../models/user");

const updateProfile = async (req, res) => {
  const { _id } = req.user;

  const { name, email, phone, bithday, skype } = req.body;

  const avatarUrl = req.file.path;

  if (req.file) {
    const user = await User.findByIdAndUpdate(_id, { ...req.body, avatarUrl}, {
      new: true,
    });

    if (!user || user === null) {
      res.status(404).json({
        message: "Not found",
      });
      return;
    }
  }
  console.log("avatarCloudinary:", avatarUrl);

  res.status(200).json({
    message: "Success",
    userData: {
      name,
      email,
      phone,
      bithday,
      skype,
      avatarUrl,
    },
  });
};

module.exports = updateProfile;
