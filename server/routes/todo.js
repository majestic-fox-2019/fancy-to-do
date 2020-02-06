const express = require("express");
const router = express.Router();
const Controller = require("../controllers/todo");
const authorization = require("../middlewares/authorization");

router.post("/", Controller.create);
router.get("/", Controller.findAll);
router.use("/:id", authorization)
router.get("/:id", Controller.findOne)
router.put("/:id", Controller.update);
router.patch("/:id", Controller.patch);
router.delete("/:id", Controller.destroy);

module.exports = router;
