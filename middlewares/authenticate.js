"use strict";

const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const token = req.headers.token;
    const user = jwt.verify(token, process.env.secret_key);
    req.user = user;
    next();
  } catch (err) {
    res.status(404).json({ message: "Token is invalid" });
  }
}