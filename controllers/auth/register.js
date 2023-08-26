const bcrypt = require('bcrypt');
const { User } = require("../../models/user");
const { HttpError } = require("../../helpers");
const {ctrlWrapper} = require('../../helpers');

const register = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user) {
        throw HttpError(409, "Conflict"); // Email in use
    };

    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({ ...req.body, password: hashPassword });

    res.status(201).json({
      "message": "Successfully registered",
      "userData": {
          name: newUser.name,
          email: newUser.email,
          id: newUser._id,
        },
    })
};

module.exports = ctrlWrapper(register);
