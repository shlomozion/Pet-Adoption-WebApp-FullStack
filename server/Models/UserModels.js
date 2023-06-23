const database = require("../knex/knex");
const jwt = require("jsonwebtoken");

const signUpModel = async (req) => {
  try {
    const { firstName, lastName, email, password, phoneNumber, isWeeklyEmail } =
      req.body;
    const userIdAddedToDatabase = await database("users").insert({
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
      phoneNumber: phoneNumber,
      weeklyEmail: isWeeklyEmail,
    });

    const token = jwt.sign(
      { id: userIdAddedToDatabase },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );
    req.body.token = token;
    [req.body.userId] = userIdAddedToDatabase;
    return req;
  } catch (err) {
    res.status(500);
    console.log(err);
  }
};
const logInModel = async (req, res) => {
  // console.log("im here in the cookie ");
  delete req.body.password;
  try {
    if (req.body.userId) {
      const { token, userId } = req.body;
      res.cookie("@" + userId, token, {
        maxAge: 86400000,
        httpOnly: true,
        sameSite: "None",
        secure: true,
      });
      // console.log("set cookie");
      return true;
    }
    if (req.body.adminId) {
      const { token, adminId } = req.body;
      res.cookie("@" + adminId, token, {
        maxAge: 86400000,
        httpOnly: true,
        sameSite: "None",
        secure: true,
      });
      // console.log("set cookie");
      return true;
    }
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
    return false;
  }
};
const logOutModel = async (cookie, res) => {
  console.log("cookie", cookie);
  try {
    res.clearCookie("@" + cookie.id, { sameSite: "None", secure: true });
    return true;
  } catch (err) {
    res.status(500).send(err);
    console.log(err);
    return false;
  }
};
const getUserByIdModel = async (req) => {
  try {
    const userId = req.body.cookie.id;
    const user = await database("users").where({ userId }).first();
    if (!user) {
      return;
    }
    return user;
  } catch (err) {
    console.log(err);
  }
};
const getUserProfileImageModel = async (req) => {
  try {
    let userId;
    if (req.body.cookie) {
      userId = req.body.cookie.id;
    } else {
      userId = req.body.userId;
    }
    const userProfileImage = await database("profile_images")
      .where({ userId })
      .first();
    console.log(
      "file: UserModels.js:96 ~ getUserProfileImageModel ~ userProfileImage:",
      userProfileImage
    );
    if (userProfileImage) {
      return userProfileImage;
    } else {
      return;
    }
  } catch (err) {
    console.log(err);
  }
};
const updateUserPasswordModel = async (userInfo) => {
  console.log("userInfo", userInfo);
  try {
    const { password } = userInfo;
    console.log(" password", password);

    const { id } = userInfo.cookie;
    console.log(" id", id);

    const isUserPasswordUpdated = await database("users")
      .where({ userId: id })
      .update({ password: password });
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
};
const updateUserByIdModel = async (updateFieldArr) => {
  console.log("updateFieldArr:", updateFieldArr);
  try {
    const userId = updateFieldArr.shift();
    console.log("userId:", userId);

    updateFieldArr.forEach(async (element) => {
      // console.log("element:", element);
      const updates = {};
      updates[element[0]] = element[1];
      const update = await database("users")
        .where({ userId: userId[1] })
        .update(updates);
      // console.log(" updates:", updates);
    });
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
};

const writeFileToDbModel = async (req) => {
  const userId = req.params.id.replace(":", "");
  const profileImg = req.file.location;

  const isKeyAdded = await database("profile_images")
    .select("userId")
    .where("userId", userId)
    .then((rows) => {
      if (rows.length > 0) {
        return database("profile_images").where("userId", userId).update({
          userId: userId,
          key: profileImg,
        });
      } else {
        return database("profile_images").insert({
          userId: userId,
          key: profileImg,
        });
      }
    })
    .then(() => {
      console.log("Value was updated or inserted successfully.");
    })
    .catch((error) => {
      console.error("Error:", error);
    });
  return;
  // response.result.key;
};

module.exports = {
  signUpModel,
  logInModel,
  logOutModel,
  getUserByIdModel,
  updateUserPasswordModel,
  updateUserByIdModel,
  writeFileToDbModel,
  getUserProfileImageModel,
};
