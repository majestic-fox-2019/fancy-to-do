const express = require('express');
const router = express.Router();
const todoController = require('../controllers/todoController');
const { authentication } = require('../middlewares/auth');

router.use(authentication);
router.get("/", todoController.findAll);
router.post("/", todoController.create);
router.get("/:id", todoController.findOne);
router.put("/:id", todoController.updateById);
router.delete("/:id", todoController.deleteById);

module.exports = router;
