const router = require("express").Router();
const db = require("../database/dbConfig");
const bcrypt = require("bcrypt");
const validateUser = require("../helpers/helper-functions.js").validateUser;
const generateToken = require("../helpers/helper-functions.js").generateToken;

router.post("/register", (req, res) => {
  // implement registration
  let newUser = req.body;
  const validatedResult = validateUser(newUser);
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
  let credentials = req.body;
  const validatedResult = validateUser(credentials);
  if (validatedResult.error) {
    return res.status(400).send(validatedResult.error.details[0].message);
  }
  console.log("hello");
  db("users")
    .where({ username: credentials.username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(credentials.password, user.password)) {
        const token = generateToken(user);
        res.status(200).json(token);
      } else {
        res.status(401).json({ message: "Invalid Credentials" });
      }
    })
    .catch(err => {
      console.log("err is: ", err);
      res.status(500).json(err);
    });
});

router.get("/users", (req, res) => {
  db("users").then(users => {
    res.json(users);
  });
});

module.exports = router;
