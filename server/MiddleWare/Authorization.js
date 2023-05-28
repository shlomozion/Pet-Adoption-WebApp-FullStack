require("dotenv").config();
const jwt = require("jsonwebtoken");

const authorization = async (req, res, next) => {
  console.log("req.body", req.body);
  if (!req.headers.authorization) {
    res.status(401).send("Token Required");
    return;
  }
  let token = req.headers.authorization.replace("Bearer", "").split(" ")[1];
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (decoded) {
      res.status(200);
      // console.log("decoded", decoded);
      next();
      return;
    } else {
      res.status(401).send(err.message);
      // console.log("err", err);
    }
  });
};
module.exports = { authorization };
