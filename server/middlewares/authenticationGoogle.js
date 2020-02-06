const { user } = require("../models");

module.exports = (req, res, next) => {
  const { OAuth2Client } = require("google-auth-library");
  const client = new OAuth2Client(process.env.Client_ID);
  console.log(process.env.Client_ID);
  client
    .verifyIdToken({
      idToken: req.body.token,
      audience: process.env.Client_ID
    })
    .then(verified => {
      console.log(123456);
      req.payload = verified.getPayload();
      console.log(req.payload);
      next();
    })
    .catch(err => {
      res.status(500).json;
    });
};
