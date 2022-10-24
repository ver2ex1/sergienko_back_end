const mongoose = require("mongoose");
const Image = require("../../models/Image");

class imageController {
  async createImage(req, res) {
    try {
      const image = new Image({
        _id: new mongoose.Types.ObjectId(),
        image: req.file.path,
        description: req.body.description,
      });
      image.save();
      return res.json({ message: "Image was succesfully added" });
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: "Failed to add image" });
    }
  }
  async getImage(req, res) {
    try {
      const images = await Image.find();
      res.json(images);
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: "Failed to get images" });
    }
  }

  async deleteImage(req, res) {
    try {
      await Image.findByIdAndDelete(req.params.id);
      return res.json({ message: "Image succesfully deleted" });
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: "Failed to delete image" });
    }
  }
}

module.exports = new imageController();
