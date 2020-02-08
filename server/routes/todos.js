const express = require('express');
const router = express.Router();
const todoController = require('../controllers/todoController');
const { authentication, authorization } = require('../middlewares/auth');

router.use(authentication);
router.get("/", todoController.findAll);
router.post("/", todoController.create);
router.get("/:id", authorization, todoController.findOne);
router.put("/:id", authorization, todoController.updateById);
router.patch("/:id/done", authorization, todoController.done);
router.patch("/:id/undone", authorization, todoController.undone);
router.delete("/:id", authorization, todoController.deleteById);

module.exports = router;
