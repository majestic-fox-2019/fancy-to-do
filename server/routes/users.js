const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router
  .post("/register", userController.register)
  .post("/login", userController.login)
  .post("/g-signin", userController.gsignin);

module.exports = router;
