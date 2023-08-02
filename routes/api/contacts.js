const express = require('express');

const router = express.Router();

const ctrl = require('../../controllers/contacts');

const schemas = require('../../schemas/contacts');

const { validation, isValidId, validateUpdate, authenticate } = require('../../middleware');

router.get('/', authenticate, ctrl.getAll);

router.get('/:contactId', authenticate, isValidId, ctrl.getById);

router.post('/', authenticate, validation(schemas.addSchema), ctrl.add);

router.delete('/:contactId', authenticate, isValidId, ctrl.deleteById);

router.put('/:contactId', authenticate, isValidId, validation(schemas.addSchema), ctrl.updateById);

router.patch('/:contactId/favorite', authenticate, isValidId, validateUpdate(schemas.updateFavoriteSchema), ctrl.updateStatusContact);

module.exports = router;
