const express = require('express');

const router = express.Router();

const ctrl = require('../../controllers/contacts');

const schemas = require('../../schemas/contacts');

const { validation } = require('../../middleware');

router.get('/', ctrl.getAll);

router.get('/:contactId', ctrl.getById);

router.post('/', validation(schemas), ctrl.add);

router.delete('/:contactId', ctrl.deleteById);

router.put('/:contactId', validation(schemas), ctrl.updateById);

module.exports = router;
