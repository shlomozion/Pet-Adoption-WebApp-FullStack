const database = require("../../../knex/knex");
const emailValidator = async (req, res, next) => {
  const { email } = req.body;
  try {
    const user = await database("users").where({ email: email });
    !user[0]?.email
      ? res.status(400).send(`you don't have an account`)
      : next();
  } catch (err) {
    res.status(500);
  }
};
module.exports = { emailValidator };
