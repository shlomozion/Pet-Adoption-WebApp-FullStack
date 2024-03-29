const dataBase = require("./knex/knex");
const express = require("express");
const cors = require("cors");
const app = express();
app.use(
  cors({
    origin: ["https://pet-adopt-client.vercel.app", "http://localhost:3000"],
    credentials: true,
  })
);

const compression = require("compression");
app.use(compression());
require("dotenv").config();
const PORT = process.env.PORT;
app.use(express.json({ limit: "25mb" }));
app.use(express.urlencoded({ extended: true }));
const usersRoute = require("./Routes/userRoutes");
app.use("/users", usersRoute);
const petRoute = require("./Routes/petRoutes");
app.use("/pets", petRoute);
const adminRoute = require("./Routes/adminRoutes");
app.use("/admin", adminRoute);

// app.use((req, res, next) => {
//   //global middleware for logging request. you need to write to a file.
// });

dataBase.migrate
  .latest()
  .then((migration) => {
    if (migration) {
      console.log("connected to database", migration);
      app.listen(PORT, () => {
        console.log(`listening on port ${PORT}!`);
      });
    }
  })
  .catch((err) => {
    console.error("Failed to connect to the database:", err);
    process.exit(1);
  });
