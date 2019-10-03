const Joi = require("@hapi/joi");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const secret = process.env.SECRET;

function validateUser(user) {
  const schema = Joi.object({
    username: Joi.string()
      .min(3)
      .required(),
    password: Joi.string()
      .min(5)
      .required()
  });
  return schema.validate(user);
}

// Generate JWT Token
function generateToken(user) {
  const payload = {
    username: user.username,
    password: user.password
  };
  const options = {
    expiresIn: "2h"
  };
  return jwt.sign(payload, secret, options);
}

module.exports = {
  validateUser,
  generateToken
};
