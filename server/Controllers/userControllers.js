const {
  signUpModel,
  logInModel,
  logOutModel,
  getUserByIdModel,
  updateUserPasswordModel,
  updateUserByIdModel,
  uploadImgModel,
  writeFileToDbModel,
  getUserProfileImageModel,
} = require("../Models/UserModels");

const signUp = async (req, res) => {
  try {
    // console.log("req", req.body);
    const newUserId = await signUpModel(req);
    const isCookieSet = await logInModel(req, res);
    res.status(201).send(req.body);
  } catch (err) {
    res.status(500);
  }
};

const logIn = async (req, res) => {
  try {
    const isCookieSet = await logInModel(req, res);
    const userImage = await getUserProfileImageModel(req);
    console.log(" userImage+++++:", userImage);
    if (!userImage) {
      console.log("noImage");
      res.status(200).send(req.body);
    } else {
      console.log("yes Image");
      const { key } = userImage;
      const user = req.body;
      res.status(200).send({ user, key });
    }
  } catch (err) {
    res.sendStatus(500);
  }
};

const logOut = async (req, res) => {
  try {
    const isCookieRemoved = await logOutModel(req.body.cookie, res);
    res.status(200).send("logged out");
    console.log("done");
  } catch (err) {
    console.log(err);
  }
};

const getUserById = async (req, res) => {
  try {
    // console.log("id", userId);
    const { token } = req.body.cookie;

    const userFromDB = await getUserByIdModel(req);
    // console.log(
    //   "file: userControllers.js:59 ~ getUserById ~ userFromDB:",
    //   userFromDB
    // );
    if (!userFromDB) {
      res.send(null);
      return;
    }
    delete userFromDB.password;
    const userImage = await getUserProfileImageModel(req);
    console.log("userImg", userImage);
    console.log(req.body);
    if (!userImage) {
      res.send({
        token,
        userFromDB,
      });
    } else {
      const key = userImage.key;
      res.send({
        key,
        token,
        userFromDB,
      });
    }
  } catch (err) {
    res.status(500);
  }
};

const updateUserById = async (req, res) => {
  try {
    const { userId } = req.body.cookie;
    const updatedFieldsObj = req.body.updatedFieldsObj;
    const updateFieldArr = Object.entries(updatedFieldsObj);
    updateFieldArr.unshift(["userId", userId]);

    const isUserUpdated = await updateUserByIdModel(updateFieldArr);
    const updatedUser = await getUserByIdModel(userId);
    delete updatedUser.password;

    if (isUserUpdated) {
      res.status(201).send(updatedUser);
    }
  } catch (err) {
    res.status(500).send(err);
    console.log(err);
  }
};

const updateUserPasswordById = async (req, res) => {
  try {
    const isUserPasswordUpdated = await updateUserPasswordModel(req.body, res);
    isUserPasswordUpdated === true && res.status(200).send();
  } catch (err) {
    res.status(500).send(err);
  }
};

const uploadProfileImg = async (req, res) => {
  const isFileKeyToDb = await writeFileToDbModel(req);
  res.status(201).send("photo added");
};

const deleteUserById = (req, res) => {};

module.exports = {
  signUp,
  logIn,
  logOut,
  getUserById,
  updateUserPasswordById,
  updateUserById,
  deleteUserById,
  uploadProfileImg,
};
