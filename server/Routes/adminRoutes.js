const express = require("express");
const router = express.Router();
require("dotenv").config();
const aws = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");

const s3 = new aws.S3({
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  region: process.env.AWS_BUCKET_REGION,
});
const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.AWS_S3_BUCKET_NAME,
    contentType: multerS3.AUTO_CONTENT_TYPE,
    acl: "public-read",
    key: function (req, file, cb) {
      cb(null, file.originalname);
    },
  }),
});
const adminControllers = require("../Controllers/adminControllers");
const {
  bodyValidator,
} = require("../MiddleWare/usersMiddleware/BodyValidator");
const { signInSchema } = require("..//Schemas/userSchemas");
const {
  adminPasswordValidator,
} = require("../MiddleWare/AdminMiddleware/AdminPasswordValidator");
// const userController = require("../Controllers/userControllers");
const {
  CookieIdRetriever,
} = require("../MiddleWare/usersMiddleware/Login/CookieIdRetriever");
const { isAdmin } = require("../MiddleWare/AdminMiddleware/isAdmin");
const { authorization } = require("../MiddleWare/Authorization");
const { addPetSchema } = require("..//Schemas/petSchemas");

router.get("/adminToken", CookieIdRetriever, adminControllers.getAdminById);

router.post(
  "/login",
  bodyValidator(signInSchema),
  adminPasswordValidator,
  adminControllers.login
);
router.post(
  "/addPet",
  CookieIdRetriever,
  authorization,
  isAdmin,
  bodyValidator(addPetSchema),
  adminControllers.addPet
);
router.post(
  "/uploadPetImg",
  CookieIdRetriever,
  authorization,
  upload.single("image"),
  adminControllers.addPetImg
);

// router.get("/users", userController.getUsers);
// router.delete("/:id", userController.deleteUserById);
// const updateUserById = (req, res) => {};
module.exports = router;
