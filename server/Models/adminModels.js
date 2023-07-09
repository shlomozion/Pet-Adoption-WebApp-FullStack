const database = require("../knex/knex");
// const { uploadPetImage } = require("../S3");

const getAdminByIdModel = async (req) => {
  try {
    const { id } = req.body.cookie;
    const admin = await database("admin").where({ adminId: id }).first();
    // console.log("admin", admin);
    if (!admin) {
      return;
    }
    return admin;
  } catch (err) {
    console.log(err);
  }
};
const addPetToDBModel = async (req) => {
  try {
    const {
      petTypeArr: [petTypeArr],
      petName,
      petStatus,
      petBreedArr: [petBreedArr],
      height,
      weight,
      petColorArr: [petColorArr],
      bio,
      hypoallergenic,
      dietaryRestrictionArr: [dietaryRestrictionArr],
    } = req.body.newPet;

    newPetId = await database("pets").insert({
      type: petTypeArr,
      name: petName,
      adoptionStatus: petStatus,
      breed: petBreedArr,
      height: height,
      weight: weight,
      color: petColorArr,
      bio: bio,
      hypoallergenic: hypoallergenic,
      dietary: dietaryRestrictionArr,
    });
    req.body.petId = newPetId;
    return newPetId;
  } catch (err) {
    console.log(err);
  }
};
// const uploadPetImgModel = async (req) => {
//   console.log("req.body", req.body);

//   try {
//     const file = req.file;
//     console.log("🚀 ~  file:", file);
//     const result = await uploadPetImage(file);

//     return result;
//   } catch (err) {
//     console.log("Error", err);
//   }
// };
const addImgToDbModel = async (response) => {
  // const [newPetId] = response.petId;
  console.log("link", response);
  // const isKeyAdded = await database("pets")
  //   .select("picture")
  //   .where("petId", newPetId)
  //   .update({
  //     picture: response.result.Location,
  //   });
  return isKeyAdded;
};
module.exports = {
  getAdminByIdModel,
  addPetToDBModel,
  // uploadPetImgModel,
  addImgToDbModel,
};
