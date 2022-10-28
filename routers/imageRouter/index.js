const Router = require("express");
const router = new Router();
const controller = require("./imageController");
const imageMiddleware = require("../../middleware/imageMiddleware");
const multer = require("multer");
const { storage } = require("../../storage");

const upload = multer({
  storage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
});

router.post(
  "",
  [imageMiddleware, upload.single("image")],
  controller.createImage
);
router.get("", controller.getImage);
router.delete("/:id", imageMiddleware, controller.deleteImage);

module.exports = router;
