const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
require("dotenv").config();

cloudinary.config({
  cloud_name: "dray4rzin",
  api_key: "852568612965822",
  api_secret: "iwOeb4KY0-KRS8IujMk05fZY-6A",
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "sergiienko",
    allowedFormats: ["jpeg", "png", "jpg", "heif", "heic"],
  },
});

module.exports = {
  storage,
};
