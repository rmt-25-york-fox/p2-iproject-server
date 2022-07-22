const routes = require("express").Router();
const UserController = require("../controllers/userController");
const errorHandler = require("../middlewares/errorhandler");
const authentication = require("../middlewares/authentication");
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });
const ProfileController = require("../controllers/profileController");

routes.post("/register", UserController.register);
routes.post("/login", UserController.login);

routes.use(authentication);

routes.post(
  "/profile/upload",
  upload.single("file"),
  ProfileController.uploadImage
);

routes.use(errorHandler);

module.exports = routes;
