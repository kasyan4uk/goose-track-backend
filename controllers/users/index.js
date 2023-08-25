const { ctrlWrapper } = require("../../helpers");

const getCurrent = require("./getCurrent");

module.exports = {
    getCurrent: ctrlWrapper(getCurrent),
};