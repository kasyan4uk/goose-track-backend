const { User } = require("../../models/user");

const updateAvatar = async (req, res) => {
  const { _id } = req.user;

  const avatarUrl = req.file.path;

  // console.log("req.file:", req.file);

  // console.log("avatarUrl:", avatarUrl);

  if (req.file) {

    const updatedUser = await User.findByIdAndUpdate(_id, avatarUrl);

    if (!updatedUser) {
      res.status(404).json({
        message: "Not found",
      });
      return;
    }
  }

  res.status(200).json({
    message: "Success",
    userData: {
      avatarUrl,
    },
  });

  // if (req.file){
  //   const result = await cloudinary.uploader.upload(req.file.buffer,{
  //     folder: 'avatars',
  //     public_id: req.user._id,
  //   });

  //    const user = await User.findByIdAndUpdate(_id, {avatarUrl: result.secure_url}, {new: true});

  //   if (!user || user === null){
  //     res.status(404).json({
  //       message: "Not found",
  //     });
  //   }
  // }
  // res.status(200).json({
  //   message: "Success",
  //   userData: {
  //     avatarUrl,
  //   }
  // })
};

module.exports = updateAvatar;
