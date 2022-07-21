const router = require("express").Router();
const Controller = require("../controllers");
const errorHandler = require("../middlewares/errorHandler");
const authentication = require("../middlewares/authentication");

router.post("/register", Controller.register);
router.post("/login", Controller.login);
router.get("/digimon", Controller.fetchDigimons);
router.get("/digimon/:name", Controller.fetchSearchedDigimon);
router.post("/leaderboards", Controller.displayLeaderboard);
router.post("/create-user", Controller.createUserGlobalStats);
router.use(authentication);
router.post("/digimon/:digiId", Controller.winnerPrize);
router.get("/mydigimons", Controller.showMyDigimons)

router.use(errorHandler);

module.exports = router;
