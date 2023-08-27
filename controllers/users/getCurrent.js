const getCurrent = async (req, res) => { 
    const { name, email, phone, bithday, skype, avatar } = req.user;

    res.status(200).json({
      message: "Success",
      userData: {
        name, 
        email, 
        phone, 
        bithday, 
        skype,
        avatar,
      },
    })
};

module.exports = getCurrent;