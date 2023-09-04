const express = require("express");
let router = express.Router();
const authController = require("../Controller/Auth");
const userController = require("../Controller/User");
const multer = require("multer");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "Public/Images");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "_" + file.originalname);
  },
});

const upload = multer({ storage: storage });

router.post("/authentication", upload.any(), authController.auth);
router.post("/login", authController.login);
router.put("/edituser", upload.any(), authController.edituser);
router.delete("/delete/:id", userController.deletuser);
router.get("/getusers/:id", userController.getuser);

module.exports = router;
