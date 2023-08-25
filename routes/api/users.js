const express = require('express');

const router = express.Router();

const ctrl = require('../../controllers/users');

const { authenticate } = require('../../middleware');

router.get('/current', authenticate, ctrl.getCurrent);

router.post('/logout', authenticate, ctrl.logout);

router.patch('/', authenticate, ctrl.updateSubscriptionUser);

module.exports = router;
