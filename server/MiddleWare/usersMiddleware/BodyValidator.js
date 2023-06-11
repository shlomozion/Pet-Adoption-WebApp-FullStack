const Ajv = require("ajv");
const ajv = new Ajv();

function bodyValidator(schema) {
  try {
    return (req, res, next) => {
      const valid = ajv.validate(schema, req.body.newPet || req.body);
      // console.log(valid);
      if (!valid) {
        res.status(400).send(ajv.errors[0].message);
        return;
      }
      res.send("body validator");
      next();
    };
  } catch (err) {
    res.status(500);
  }
}
module.exports = { bodyValidator };
