const database = require("../../knex/knex");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const adminPasswordValidator = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const admin = await database("admin").where({ email: email }).first();
    bcrypt.compare(password, admin.password, function (err, result) {
      if (err) {
        res.status(500).send(err.message);
      } else {
        if (!result) {
          console.log("result", result);
          res.status(401).send("wrong password");
        } else {
          // delete admin.password;
          const token = jwt.sign({ id: admin.userId }, process.env.JWT_SECRET, {
            expiresIn: "1d",
          });

          res.status(201);
          req.body = admin;
          req.body.token = token;
          next();
        }
      }
    });
  } catch (err) {
    res.status(500);
  }
};
module.exports = { adminPasswordValidator };
