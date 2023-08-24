const express = require('express');

const router = express.Router();

// const ctrl = require("../../controllers/tasks")

const { authenticate } = require('../../middleware');

router.get("/", authenticate,);

router.post("/", authenticate,);

router.patch("/:id", authenticate,);

router.delete("/:id", authenticate,);

module.exports = router;
