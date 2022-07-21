const express = require("express");
const router = express.Router();
const UserController = require("../controllers/userController");
const ContentController = require("../controllers/contentController");
const authentication = require("../middlewares/authentication");

router.get("/", UserController.home);
router.post("/register", UserController.postRegister);
router.post("/login", UserController.postLogin);
router.get("/product", ContentController.getProduct);
router.get("/showcase", ContentController.getShowcase);

router.use(authentication);
router.post("/myorder", ContentController.postMyOrder);
router.get("/myorder", ContentController.getMyOrder);
router.patch("/myorder/:id", ContentController.patchMyOrder);
router.get("/myorder/:id", ContentController.getMyOrderById);
router.delete("/myorder/:id", ContentController.deleteMyOrderById);

router.get("/shipping/province", ContentController.getProvince);
router.get("/shipping/city", ContentController.getCity);
router.post("/shipping/cost", ContentController.getCost);

router.post("/payment", ContentController.postPayment);

module.exports = router;
