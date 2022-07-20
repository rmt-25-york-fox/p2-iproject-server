const express = require("express");
const router = express.Router();
const UserController = require("../controllers/userController");
const ContentController = require("../controllers/contentController");
const authentication = require("../middlewares/authentication");

router.get("/", UserController.home);
router.post("/register", UserController.postRegister);
router.post("/login", UserController.postLogin);
// router.post("/google-sign-in", UserController.xxx);
router.get("/product", ContentController.getProduct); //nampilin data produk masing2 kategori
router.get("/showcase", ContentController.getShowcase);

router.use(authentication);
router.post("/myorder", ContentController.postMyOrder); //bikin myorder, nanti bisa di edit
router.get("/myorder", ContentController.getMyOrder); //tarik data myOrder
router.patch("/myorder/:id", ContentController.patchMyOrder); //untuk edit myOrder
router.get("/myorder/:id", ContentController.getMyOrderById); //tarik data myOrder
router.delete("/myorder/:id", ContentController.deleteMyOrderById);

router.get("/shipping/province", ContentController.getProvince);
router.get("/shipping/city", ContentController.getCity);
router.post("/shipping/cost", ContentController.getCost);

router.post("/payment", ContentController.postPayment);

module.exports = router;
