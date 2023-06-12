const database = require("../../../knex/knex");

const duplicateUserPreventer = async (req, res, next) => {
  try {
    const { email } = req.body;
    // console.log("req", req.body);

    const response = await database("users");
    // .where({ email: email });
    console.log("response:", response);

    !response[0]?.email
      ? next()
      : response[0].email === email
      ? res.status(400).send("you already have an account")
      : next();
  } catch (err) {
    res.status(500);
  }
};
module.exports = { duplicateUserPreventer };
