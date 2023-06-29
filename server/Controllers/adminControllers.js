const { logInModel } = require("../Models/UserModels");
const {
  getAdminByIdModel,
  addPetToDBModel,
  uploadPetImgModel,
  addImgToDbModel,
} = require("../Models/adminModels");

const login = async (req, res) => {
  try {
    const isCookieSet = await logInModel(req, res);
    res.status(200).send(req.body);
  } catch (err) {
    res.status(500).send(err);
    console.log(err);
  }
};
const getAdminById = async (req, res) => {
  const admin = await getAdminByIdModel(req);
  const { token } = req.body.cookie;
  // console.log("token", token);
  if (!admin) {
    res.send("no admin");
    return;
  }
  delete admin.password;
  res.status(200).send({ token, admin });
};
let petId;
const addPet = async (req, res) => {
  console.log(" req in addPet", req);
  const newPetId = await addPetToDBModel(req);
  petId = newPetId;
  // console.log("🚀 ~ isPetAddedToDB:", isPetAddedToDB);
  res.status(201).send("pet added to db");
};
const addPetImg = async (req, res) => {
  console.log("req in addPetImg", req);
  console.log("petId", petId);
  const result = await uploadPetImgModel(req);
  const isPetImgAddedToDB = await addImgToDbModel({ petId, result });
  res.status(201).send("pet image added");
  // console.log("🚀 isPetImgAddedToDB:", isPetImgAddedToDB);
};

module.exports = { login, getAdminById, addPet, addPetImg };
