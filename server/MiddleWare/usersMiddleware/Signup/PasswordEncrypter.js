const bcrypt = require("bcrypt");

const encryptPassword = (req, res, next) => {
  const { password } = req.body;
  try {
    bcrypt.hash(password, 10, function (err, hash) {
      err
        ? res.status(500).send(err.message)
        : ((req.body.password = hash), next());
    });
  } catch (err) {
    res.status(500);
  }
};
module.exports = { encryptPassword };
