const jwt = require("jsonwebtoken");
const { User } = require("../../models/user");

const { SECRET_KEY, FRONTEND_GH_PAGE_URL } = process.env;

const googleAuth = async (req, res) => {
  const { _id: id } = req.user;

  const payload = {
    id,
  };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });
  await User.findByIdAndUpdate(id, { token });

  // methor 'redirect' redirects the user to other url-address (GH-page in this case)
  res.redirect(`${FRONTEND_GH_PAGE_URL}?token=${token}`);
};

module.exports = googleAuth;
