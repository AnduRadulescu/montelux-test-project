const jwt = require("jsonwebtoken");
const db = require("../models");
const req = require("express/lib/request");
const dotenv = require("dotenv");
dotenv.config();
const user = db.users;

const jwtAuthentication = (req, res, next) => {
  // Extracting JWT secret from environment variable
  //Extracting token from authorization header
  const { cookie } = req.headers;
  // Checking if authorization header is present
  if (!cookie) {
    return res.status(401).json({ error: "Must be logged in" });
  }
  // Removing 'Bearer ' prefix to get the token
  const token = cookie.replace("jwt=", "");
  const secretKey = process.env.secretKey;

  //Verifying if the token is valid.
  jwt.verify(token, secretKey, async (err, payload) => {
    if (err) {
      return res.status(401).send("Could not verify token");
    }
    // Adding user information to the request object
    req.user = payload;
    // return res.status(200).send({ message: "Token is valid" });
  });
  next();
};

//exporting module
module.exports = {
  jwtAuthentication,
};
