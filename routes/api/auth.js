const express = require('express');

const router = express.Router();

const ctrl = require('../../controllers/auth');

const { validation, authenticate } = require('../../middleware');

const {schemas} = require('../../models/user');

router.post('/register', validation(schemas.registerSchema), ctrl.register);

router.post('/login', validation(schemas.loginSchema), ctrl.login);

router.post('/logout', authenticate, ctrl.logout);

module.exports = router;
