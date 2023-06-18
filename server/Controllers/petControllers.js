const { getPetsModel } = require("../Models/petModels");
// const database = require("../knex/knex");

const getPets = async (req, res) => {
  const allPets = await getPetsModel();
  console.log("req", allPets);
  res.send(allPets);
};
const getPetById = (req, res) => {};
const addPet = (req, res) => {};
const updatePetById = (req, res) => {};
const deletePetById = (req, res) => {};

module.exports = {
  getPets,
  getPetById,
  addPet,
  updatePetById,
  deletePetById,
};
