var express = require('express');
var router = express.Router();
const todoController = require("../controllers/todoControllers");
const authorized = require("../middlewares/authorization")
router.get("/",todoController.getAll);
router.post("/",todoController.createOne);
router.put("/:id",authorized,todoController.updates);
router.get("/:id",authorized,todoController.findOne);
router.delete("/:id",authorized,todoController.delete);
module.exports = router;