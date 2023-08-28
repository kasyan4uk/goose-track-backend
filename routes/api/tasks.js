const express = require('express');

const router = express.Router();

const ctrl = require("../../controllers/tasks")

const { authenticate, validation } = require('../../middleware');

const { schemas } = require("../../models/task")

router.get("/", authenticate,);

router.post("/", authenticate, validation(schemas.addTaskSchema), ctrl.addTask);

router.patch("/:id", authenticate,);

router.delete("/:id", authenticate,);

module.exports = router;
