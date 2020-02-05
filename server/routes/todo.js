const express = require("express");
const router = express.Router();
const Controller = require("../controllers/todo");
const authorization = require("../middlewares/authorization");

router.post("/", Controller.create);
router.get("/", Controller.findAll);
router.get("/:id", authorization, Controller.findOne)
router.put("/:id", authorization, Controller.update);
router.delete("/:id", authorization, Controller.destroy);

module.exports = router;
