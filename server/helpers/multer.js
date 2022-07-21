const multer = require("multer");

const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, __basedir + "/upload");
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split("/")[1];
    cb(null, `files/admin-${file.fieldname}-${Date.now()}.${ext}`);
  },
});

const multerFilter = (req, file, cb) => {
  if (
    file.mimetype.split("/")[1] === "jpg" ||
    file.mimetype.split("/")[1] === "png"
  ) {
    cb(null, true);
  } else {
    cb(new Error("Image file format is not supported (PNG/JPG only)"), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

module.exports = upload;
