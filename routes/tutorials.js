const express = require("express");
const router = express.Router();
const TutorialController = require("../controllers/tutorialController");

router.get("/nodejs", TutorialController.getNodejsTutorial);
router.get("/java", TutorialController.getJavaTutorial);
router.get("/golang", TutorialController.getGolangTutorial);

module.exports = router;
