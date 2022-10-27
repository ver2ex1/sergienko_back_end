const Router = require("express");
const router = new Router();
const controller = require("./imageController");
const imageMiddleware = require("../../middleware/imageMiddleware");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString() + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
  fileFilter,
});

router.post(
  "",
  [imageMiddleware, upload.single("image")],
  controller.createImage
);
router.get("", imageMiddleware, controller.getImage);
router.delete("/:id", imageMiddleware, controller.deleteImage);

module.exports = router;
