const { ctrlWrapper } = require("../../helpers");

const getCurrent = require("./getCurrent");
const updateAvatar = require("./updateAvatar");
const updateProfile = require("./updateProfile");

module.exports = {
    getCurrent: ctrlWrapper(getCurrent),
    updateAvatar: ctrlWrapper(updateAvatar),
    updateProfile: ctrlWrapper(updateProfile),
};