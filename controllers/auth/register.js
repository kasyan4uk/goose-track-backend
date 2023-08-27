const bcrypt = require('bcrypt');
const { User } = require("../../models/user");
const { HttpError } = require("../../helpers");
const gravatar = require("gravatar");

const register = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user) {
        throw HttpError(409, `Email ${email} is in use`); 
    };

    const hashPassword = await bcrypt.hash(password, 10);

    const avatar = gravatar.url(email);

    const newUser = await User.create({ ...req.body, avatar,password: hashPassword });

    res.status(201).json({
      message: "Successfully registered",
      userData: {
          name: newUser.name,
          email: newUser.email,
          avatar: newUser.avatar,
        },
    })
};

module.exports = register;
