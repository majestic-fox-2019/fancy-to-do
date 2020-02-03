var express = require('express');
var router = express.Router();
const todoController = require("../controllers/todoControllers");
router.get("/",todoController.getAll);
router.post("/",todoController.createOne);
router.put("/:id",todoController.updates);
router.get("/:id",todoController.findOne);
router.delete("/:id",todoController.delete);
module.exports = router;