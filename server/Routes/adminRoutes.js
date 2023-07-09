const express = require("express");
const router = express.Router();
const {
  uploadPetImageToS3,
} = require("../MiddleWare/AdminMiddleware/UploadPetImageToS3");
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
  uploadPetImageToS3.single("image"),
  adminControllers.addPetImg
);

// router.get("/users", userController.getUsers);
// router.delete("/:id", userController.deleteUserById);
// const updateUserById = (req, res) => {};
module.exports = router;
