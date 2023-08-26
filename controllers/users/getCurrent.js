const getCurrent = async (req, res) => { 
    const { name, email } = req.user;

    res.status(200).json({
      message: "Success",
      name,
      email
    })
};

module.exports = getCurrent;