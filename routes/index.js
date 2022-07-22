const router = require("express").Router();
const { userController } = require("../controllers/userController");
const authentication = require("../middlewares/authentication");
const pubRoutes = require("./pub");
const sportRoutes = require("./sport");
const historyRoutes = require("./histories");
const paymentRoutes = require("./payment");

router.use("/pub", pubRoutes);
router.use("/payment", paymentRoutes);
router.post("/register", userController.register);
router.post("/login", userController.login);
router.post("/google-sign-in", userController.googleSignIn);

router.use(authentication);
router.patch("/changeSubscribe", userController.changeIsSubscribe);
router.use("/sports", sportRoutes);
router.use("/histories", historyRoutes);

module.exports = router;
