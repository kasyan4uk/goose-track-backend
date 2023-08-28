const express = require("express");

const router = express.Router();

const ctrl = require("../../controllers/users");

const { validation, authenticate, upload } = require("../../middleware");

const { schemas } = require("../../models/user");

router.get("/current", authenticate, ctrl.getCurrent);

router.patch(
  "/info",
  authenticate,
  upload.single("avatar"),
  validation(schemas.updateInfoSchema),
  ctrl.updateProfile
);

module.exports = router;
