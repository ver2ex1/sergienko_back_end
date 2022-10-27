const { Schema, model } = require("mongoose");

const Image = new Schema({
  image: { type: String, required: true, data: Buffer },
  _id: { type: String, required: true },
  description: { type: String },
  folder: { type: String, required: true },
});

module.exports = model("Image", Image);
