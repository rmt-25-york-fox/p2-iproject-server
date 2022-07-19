const router = require("express").Router();
const Controller = require("../controllers");
const errorHandler = require("../middlewares/errorHandler");

router.post("/register", Controller.register);
router.post("/login", Controller.login);
router.get("/digimons", Controller.fetchDigimons);
router.use(errorHandler);

module.exports = router;
