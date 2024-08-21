const express = require('express');
const {
  addTerm,
  getDictionary,
  getDictioanryById,
  updateDictioanry,
  deleteDictioanry,
  getTermsByQuery,
} = require("../controllers/dictionary.controller");
const router = express.Router();


router.get("/", getDictionary);
router.get("/seach/", getTermsByQuery )
router.get("/:id", getDictioanryById);
router.post("/create", addTerm);
router.put("/update/:id", updateDictioanry);
router.delete("/delete/:id", deleteDictioanry);



module.exports = router;
