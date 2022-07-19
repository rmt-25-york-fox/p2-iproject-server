const express = require("express");
const router = express.Router();
const TutorialController = require("../controllers/tutorialController");

router.get("/nodejs", TutorialController.getNodejsTutorial);
router.get("/php", TutorialController);
router.get("/golang", TutorialController);

module.exports = router;
