const express = require("express");
const router = express.Router();
const petController = require("../Controllers/petControllers");

router.get("/getPets", petController.getPets);
router.get("/:id", petController.getPetById);
router.post("/", petController.addPet);
router.put("/:id", petController.updatePetById);
router.delete("/:id", petController.deletePetById);

module.exports = router;
