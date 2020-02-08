"use strict"

const router = require("express").Router()
const purgomalumController = require("../controllers/purgomalum")

router.get("/:text", purgomalumController.getText)

module.exports = router