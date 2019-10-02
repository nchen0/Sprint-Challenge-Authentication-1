const router = require("express").Router();
const db = require("../database/dbConfig");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Joi = require("@hapi/joi");

router.post("/register", (req, res) => {
  // implement registration
  let newUser = req.body;
  const schema = Joi.object({
    username: Joi.string()
      .min(3)
      .required(),
    password: Joi.string()
      .min(5)
      .required()
  });
  const validatedResult = schema.validate(newUser);
  if (validatedResult.error) {
    return res.status(400).send(validatedResult.error.details[0].message);
  }
  const hash = bcrypt.hashSync(newUser.password, 14);
  newUser.password = hash;

  db("users")
    .insert(newUser)
    .then(result => {
      res.status(201).json(newUser);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

router.post("/login", (req, res) => {
  // implement login
});

router.get("/users", (req, res) => {
  db("users").then(users => {
    res.json(users);
  });
});

module.exports = router;
