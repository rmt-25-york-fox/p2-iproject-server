const router = require("express").Router();
const { userController } = require("../controllers/userController");
const authentication = require("../middlewares/authentication");
const pubRoutes = require("./pub");
const sportRoutes = require("./sport");
const historyRoutes = require("./histories");

router.use("/pub", pubRoutes);
router.post("/register", userController.register);
router.post("/login", userController.login);
router.post("/google-sign-in", userController.googleSignIn);

router.use(authentication);
router.use("/sports", sportRoutes);
router.use("/histories", historyRoutes);

module.exports = router;
