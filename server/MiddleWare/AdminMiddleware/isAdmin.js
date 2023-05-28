function isAdmin(req, res, next) {
  try {
    if (req.body.userEmail.includes("admin")) {
      next();
    } else {
      res.status(403).send("Forbidden access");
      return;
    }
  } catch (error) {
    res.status(500).send(error);
  }
}
module.exports = { isAdmin };
