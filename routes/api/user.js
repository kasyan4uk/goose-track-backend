const express = require('express');

const router = express.Router();

const ctrl = require('../../controllers/users');

const { authenticate, upload } = require('../../middleware');

router.get('/current', authenticate, ctrl.getCurrent);

router.post('/avatar', authenticate, upload.single('avatar'), ctrl.addAvatar);

router.patch('/info', );

module.exports = router;
