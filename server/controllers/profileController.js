"use strict";

const ImageKit = require("imagekit");
const { Photo } = require("../models");
const PRIVATE_KEY = process.env.PRIVATE_KEY;

const imagekit = new ImageKit({
  publicKey: "public_Xp0PrQ/UvqKtBfSvrr58PDlOrvE=",
  privateKey: PRIVATE_KEY,
  urlEndpoint: "https://ik.imagekit.io/menmencius",
});

class ProfileController {
  static async uploadImage(req, res, next) {
    try {
      const { id } = req.user;
      let image;

      if (req.file) {
        image = req.file.buffer.toString("base64");
      }

      imagekit
        .upload({
          file: image, //required
          fileName: req.file.originalname, //required
        })
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });

      const response = await Photo.create({
        UserId: id,
        imageUrl: image,
      });

      res.status(201).json(response);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = ProfileController;
