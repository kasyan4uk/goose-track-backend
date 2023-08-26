const { ctrlWrapper } = require("../../helpers");

const getCurrent = require("./getCurrent");
const updateInfo = require("./updateInfo");
// const updateAvatar = require("./updateAvatar");

module.exports = {
    getCurrent: ctrlWrapper(getCurrent),
    updateInfo: ctrlWrapper(updateInfo),
    // updateAvatar: ctrlWrapper(updateAvatar),
};