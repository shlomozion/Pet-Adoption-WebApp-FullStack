const express = require("express");
const router = express.Router();
// require("dotenv").config();
// const aws = require("aws-sdk");
// const multer = require("multer");
// const multerS3 = require("multer-s3");

// const s3 = new aws.S3({
//   secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
//   accessKeyId: process.env.AWS_ACCESS_KEY_ID,
//   region: process.env.AWS_BUCKET_REGION,
// });
// const upload = multer({
//   storage: multerS3({
//     s3: s3,
//     bucket: process.env.AWS_S3_BUCKET_NAME,
//     contentType: multerS3.AUTO_CONTENT_TYPE,
//     acl: "public-read",
//     key: function (req, file, cb) {
//       // console.log("photo req", req.body, file);
//       cb(null, file.originalname);
//     },
//   }),
// });
const { uploadToS3 } = require("../MiddleWare/usersMiddleware/UploadImgToS3");
const userController = require("../Controllers/userControllers");
const {
  duplicateUserPreventer,
} = require("../MiddleWare/usersMiddleware/Signup/DuplicateUserPreventer");
const {
  bodyValidator,
} = require("../MiddleWare/usersMiddleware/BodyValidator");
const {
  passwordValidator,
} = require("../MiddleWare/usersMiddleware/Login/PasswordValidator");
const {
  emailValidator,
} = require("../MiddleWare/usersMiddleware/Login/EmailValidator");
const {
  encryptPassword,
} = require("../MiddleWare/usersMiddleware/Signup/PasswordEncrypter");
const {
  CookieIdRetriever,
} = require("../MiddleWare/usersMiddleware/Login/CookieIdRetriever");
const { authorization } = require("../MiddleWare/Authorization");
const {
  changePasswordValidator,
} = require("../MiddleWare/usersMiddleware/Login/ChangePasswordValidator");
const { signUpSchema, signInSchema } = require("..//Schemas/userSchemas");

router.get("/token", CookieIdRetriever, userController.getUserById);

router.post(
  "/validateOldPassword",
  CookieIdRetriever,
  authorization,
  changePasswordValidator
);

router.post(
  "/resetPassword",
  CookieIdRetriever,
  authorization,
  encryptPassword,
  userController.updateUserPasswordById
);

router.post(
  "/signup",
  bodyValidator(signUpSchema),
  duplicateUserPreventer,
  encryptPassword,
  userController.signUp
);

router.post(
  "/login",
  bodyValidator(signInSchema),
  emailValidator,
  passwordValidator,
  userController.logIn
);

router.post(
  "/signout/:id",
  CookieIdRetriever,
  authorization,
  userController.logOut
);

router.post(
  "/uploadImg/:id",
  CookieIdRetriever,
  authorization,
  uploadToS3.single("image"),
  userController.uploadProfileImg
);

router.put(
  "/updateUserInfo/:id",
  CookieIdRetriever,
  authorization,
  userController.updateUserById
);

router.delete("/:id", userController.deleteUserById);

module.exports = router;
