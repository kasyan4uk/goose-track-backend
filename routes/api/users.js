const express = require('express');

const ctrl = require('../../controllers/auth')

const { validation, authenticate } = require('../../middleware');

const {schemas} = require('../../models/user');

const router = express.Router();

router.post('/register', validation(schemas.registerSchema), ctrl.register);

router.post('/login', validation(schemas.loginSchema), ctrl.login);

router.get('/current', authenticate, ctrl.getCurrent);

router.post('/logout', authenticate, ctrl.logout);

router.patch('/', authenticate, ctrl.updateSubscriptionUser);

module.exports = router;
