const getCurrent = async (req, res) => {
  const { name, email, phone, birthday, skype, avatarUrl } = req.user;

  res.status(200).json({
    message: "Success",
    userData: {
      name,
      email,
      phone,
      skype,
      birthday,
      avatarUrl,
    },
  });
};

module.exports = getCurrent;
