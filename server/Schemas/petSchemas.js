const addPetSchema = {
  type: "object",
  properties: {
    petName: { type: "string" },
    petTypeArr: { type: "array" },
    petBreedArr: { type: "array" },
    petColorArr: { type: "array" },
    height: { type: "string" },
    hypoallergenic: { type: "string" },
    weight: { type: "string" },
    petStatus: { type: "string" },
    bio: { type: "string" },
  },

  required: [
    "petName",
    "petTypeArr",
    "petBreedArr",
    "petColorArr",
    "height",
    "weight",
    "hypoallergenic",
    "petStatus",
    "bio",
  ],
  additionalProperties: { type: "array" },
};
module.exports = { addPetSchema };
