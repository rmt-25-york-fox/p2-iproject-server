"use strict";

class ProfileController {
  static async uploadImage(req, res, next) {
    try {
      console.log(req.file, "file");
    } catch (error) {
      next(error);
    }
  }
}

module.exports = ProfileController;
