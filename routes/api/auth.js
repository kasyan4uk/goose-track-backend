const express = require("express");

const router = express.Router();

const ctrl = require("../../controllers/auth");

const { validation, authenticate, passport } = require("../../middleware");

const { schemas } = require("../../models/user");

router.post("/register", validation(schemas.registerSchema), ctrl.register);

// this route (...onrender.com/auth/google) user follows from frontend (and we redirect user to google.accounts page)
router.get(
  "/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

// on click on user's email/gmail in google.accounts page - we add user to req.user or register user + add user to req.user
// { session: false } does not create session
router.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  ctrl.googleAuth
);

router.post("/login", validation(schemas.loginSchema), ctrl.login);

router.post("/logout", authenticate, ctrl.logout);

module.exports = router;