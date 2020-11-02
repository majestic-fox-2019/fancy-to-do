const { user } = require("../models");

module.exports = (req, res, next) => {
  const { OAuth2Client } = require("google-auth-library");
  const client = new OAuth2Client(process.env.Client_ID);
  client
    .verifyIdToken({
      idToken: req.body.token,
      audience: process.env.Client_ID
    })
    .then(verified => {
      req.payload = verified.getPayload();
      next();
    })
    .catch(err => {
      res.status(500).json;
    });
};
