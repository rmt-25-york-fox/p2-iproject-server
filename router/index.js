const Contoller = require("../controllers/Controller");
const authentication = require("../middlewares/authentication");

const router = require("express").Router();

router.post("/register", Contoller.register);
router.post("/login", Contoller.login);

router.use(authentication);

module.exports = router;
