const Controller = require("../controllers/Controller");
const authentication = require("../middlewares/authentication");

const router = require("express").Router();

router.post("/register", Controller.register);
router.post("/login", Controller.login);

router.use(authentication);
router.post("/order/:productId", Controller.addUserOrder);
router.get("/order", Controller.getUserOrder);
router.get("/payment", Controller.payment);

module.exports = router;
