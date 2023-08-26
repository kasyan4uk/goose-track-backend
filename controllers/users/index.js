const { ctrlWrapper } = require("../../helpers");

const getCurrent = require("./getCurrent");
const addAvatar = require("./addAvatar");

module.exports = {
    getCurrent: ctrlWrapper(getCurrent),
    addAvatar: ctrlWrapper(addAvatar),
};