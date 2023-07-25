const express = require('express');

const router = express.Router();

const ctrl = require('../../controllers/contacts');

const schemas = require('../../schemas/contacts');

const { validation, isValidId, validateUpdate } = require('../../middleware');

router.get('/', ctrl.getAll);

router.get('/:contactId', isValidId, ctrl.getById);

router.post('/', validation(schemas.addSchema), ctrl.add);

router.delete('/:contactId', isValidId, ctrl.deleteById);

router.put('/:contactId', isValidId, validation(schemas.addSchema), ctrl.updateById);

router.patch('/:contactId/favorite', isValidId, validateUpdate(schemas.updateFavoriteSchema), ctrl.updateStatusContact);

module.exports = router;
