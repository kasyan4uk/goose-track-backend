const express = require('express');

const router = express.Router();

const ctrl = require('../../controllers/users');

const { validation, authenticate } = require('../../middleware');

const {schemas} = require('../../models/user');

router.get('/current', authenticate, ctrl.getCurrent);

router.patch('/info', authenticate, validation(schemas.updateInfoSchema), ctrl.updateInfo); 



// router.patch("/avatars", authenticate, upload.single("avatar"), ctrl.updateAvatar);

module.exports = router;
