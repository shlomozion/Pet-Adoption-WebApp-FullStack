const CookieIdRetriever = (req, res, next) => {
  try {
    const rawCookie = req.headers.cookie;
    if (!rawCookie) {
      res.send("not logged in");
      return;
    } else {
      let arr = rawCookie.split(";");
      const regex = /@([0-9]+)/;
      const [cookieStr] = arr.filter((str) => str.match(regex));
      const data = cookieStr.split("=");
      const id = data[0].split("@");
      const retrievedCookie = { id: id[1], token: data[1] };
      req.body.cookie = retrievedCookie;
    }
    next();
  } catch (err) {
    console.log(err);
  }
};
module.exports = { CookieIdRetriever };
