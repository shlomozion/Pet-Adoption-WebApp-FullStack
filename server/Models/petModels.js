const database = require("../knex/knex");
const getPetsModel = async () => {
  try {
    const allPets = await database("pets");
    // console.log("🚀  allPets:", allPets);
    return allPets;
  } catch (err) {
    console.log(err);
  }
};
module.exports = { getPetsModel };
