const database = require("../../../knex/knex");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const passwordValidator = async (req, res, next) => {
  try {
    // console.log("passwordValidator");
    const { email, password } = req.body;
    const user = await database("users").where({ email: email }).first();
    // console.log(user);
    bcrypt.compare(password, user.password, function (err, result) {
      if (err) {
        res.status(500).send(err.message);
      } else {
        if (!result) {
          res.status(401).send("wrong password");
        } else {
          const token = jwt.sign({ id: user.userId }, process.env.JWT_SECRET, {
            expiresIn: "1d",
          });
          res.status(201);
          req.body = user;
          req.body.token = token;
          next();
        }
      }
    });
  } catch (err) {
    res.status(500);
  }
};
module.exports = { passwordValidator };
