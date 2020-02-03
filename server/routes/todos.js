const express = require('express');
const router = express.Router();
const todoController = require('../controllers/todoController');

router.post("/", todoController.create);
router.get("/", todoController.findAll);
router.get("/:id", todoController.findOne);
router.put("/:id", todoController.updateById);
router.delete("/:id", todoController.deleteById);

module.exports = router;
