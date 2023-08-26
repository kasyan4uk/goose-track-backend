const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require("../../models/user");

const  {HttpError}  = require("../../helpers");

const { SECRET_KEY } = process.env;

const login = async(req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) { 
        throw HttpError(401, "Unauthorized");  // Email or password is wrong
    };

    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) { 
        throw HttpError(401, "Unauthorized");
    };

    const payload = {
        id: user._id,
    }
    
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });
    await User.findByIdAndUpdate(user.id, {token})

    res.status(200).json({
        message: "Logged in successfully",
        user: {
          name: user.name,
          email: user.email,
          token,
        },
    });
};

module.exports = login;