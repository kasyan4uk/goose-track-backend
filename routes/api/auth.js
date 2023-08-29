const express = require("express");

const router = express.Router();

const ctrl = require("../../controllers/auth");

const { validation, authenticate, passport } = require("../../middleware");

const { schemas } = require("../../models/user");

router.post("/register", validation(schemas.registerSchema), ctrl.register);

// на этот роут (...onrender.com/auth/google) юзер переходит с фронтенда (если запрос приходит сюда - юзера перекидываем на гугл)
router.get(
  "/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

// при клике на свой акк в на странице google.accounts добавляем юзера в req.user или регистрируем его + добавляем юзера в req.user
// { session: false } не создает сессию
router.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  ctrl.googleAuth
);

router.post("/login", validation(schemas.loginSchema), ctrl.login);

router.post("/logout", authenticate, ctrl.logout);

module.exports = router;