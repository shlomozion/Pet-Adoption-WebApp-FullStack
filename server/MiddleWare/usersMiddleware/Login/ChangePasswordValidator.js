const database = require("../../../knex/knex");
const bcrypt = require("bcrypt");

const changePasswordValidator = async (req, res, next) => {
  const { password } = req.body;
  const { id } = req.body.cookie;
  console.log(
    "file: ChangePasswordValidator.js:7 ~ changePasswordValidator ~ userId:",
    id
  );
  const user = await database("users").where({ userId: id }).first();
  bcrypt.compare(password, user.password, function (err, result) {
    if (err) {
      res.status(500).send(err.message);
    } else {
      if (!result) {
        res.status(401).send("wrong password");
      } else {
        res.status(200).send("new password");
        next();
      }
    }
  });
  //   console.log("user", user);
  //   console.log("userId", userId);
  //   console.log("password", password);
};
module.exports = { changePasswordValidator };
