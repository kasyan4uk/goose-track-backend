const { User } = require("../../models/user");

const updateInfo = async (req, res) => {
  const { _id } = req.user;


  const user = await User.findByIdAndUpdate(_id, req.body, { new: true });


  if (!user || user === null) {
    res.status(404).json({
      message: "Not found",
    });
    return;
  }


  res.status(200).json({
    message: "Success",
    userData: {
      ...req.body,
     
    }
  })
};

module.exports = updateInfo;