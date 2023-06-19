const database = require("../knex/knex");
const jwt = require("jsonwebtoken");
const { uploadFile } = require("../S3");

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
  console.log("im here in the cookie ");
  delete req.body.password;
  try {
    if (req.body.userId) {
      const { token, userId } = req.body;
      res.cookie("@" + userId, token, {
        maxAge: 86400000,
        httpOnly: true,
        sameSite: "lax",
        secure: true,
      });
      console.log("set cookie");
      return true;
    }
    if (req.body.adminId) {
      const { token, adminId } = req.body;
      res.cookie("@" + adminId, token, {
        maxAge: 86400000,
        httpOnly: true,
        sameSite: "lax",
        secure: true,
      });
      console.log("set cookie");
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
    res.clearCookie("@" + cookie.id);
    return true;
  } catch (err) {
    res.status(500).send(err);
    console.log(err);
    return false;
  }
};
const getUserByIdModel = async (req) => {
  // console.log(req, "id");
  try {
    const user = await database("users").where({ userId: req.id }).first();
    console.log("user", user);
    if (!user) {
      return;
    }
    return user;
  } catch (err) {
    console.log(err);
  }
};
const getUserProfileImageModel = async (id) => {
  console.log("id", id);
  try {
    const user = await database("profile_images").where({ userId: id }).first();
    console.log("user", user);
    if (user) {
      return user;
    } else {
      return;
    }
  } catch (err) {
    console.log(err);
  }
};
const updateUserPasswordModel = async (userInfo) => {
  try {
    const { password } = userInfo;
    const { userId } = userInfo.cookie;
    const isUserPasswordUpdated = await database("users")
      .where({ userId: userId })
      .update({ Password: password });
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
};
const updateUserByIdModel = async (updateFieldArr) => {
  try {
    const userId = updateFieldArr.shift();

    updateFieldArr.forEach(async (element) => {
      const updates = {};
      updates[element[0]] = element[1];
      const update = await database("users")
        .where({ userId: userId[1] })
        .update(updates);
    });
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
};
const uploadImgModel = async (req) => {
  try {
    const userId = req.params.id.replace(":", "");
    const file = req.file;
    const result = await uploadFile(file);

    return { result, userId };
  } catch (err) {
    console.log("Error", err);
  }
};
const writeFileToDbModel = async (response) => {
  const isKeyAdded = await database("profile_images")
    .select("userId")
    .where("userId", response.userId)
    .then((rows) => {
      if (rows.length > 0) {
        return database("profile_images")
          .where("userId", response.userId)
          .update({
            userId: response.userId,
            key: response.result.Location,
          });
      } else {
        return database("profile_images").insert({
          userId: response.userId,
          key: response.result.key,
        });
      }
    })
    .then(() => {
      console.log("Value was updated or inserted successfully.");
    })
    .catch((error) => {
      console.error("Error:", error);
    });
  return response.result.key;
};

module.exports = {
  signUpModel,
  logInModel,
  logOutModel,
  getUserByIdModel,
  updateUserPasswordModel,
  updateUserByIdModel,
  uploadImgModel,
  writeFileToDbModel,
  getUserProfileImageModel,
};
