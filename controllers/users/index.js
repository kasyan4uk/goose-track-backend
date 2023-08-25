const { ctrlWrapper } = require("../../helpers");

const logout = require("./logout");
const getCurrent = require("./getCurrent");
const updateSubscriptionUser = require("./updateSubscriptionUser");

module.exports = {
    logout: ctrlWrapper(logout),
    getCurrent: ctrlWrapper(getCurrent),
    updateSubscriptionUser: ctrlWrapper(updateSubscriptionUser),
};