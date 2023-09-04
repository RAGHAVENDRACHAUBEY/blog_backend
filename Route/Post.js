const express = require("express");
const router = express.Router();
const PostController = require("../Controller/Post");
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

router.post("/post", upload.any(), PostController.createpost);
router.put("/update/:id", upload.any(), PostController.editpost);
router.delete("/delete/:id", PostController.deletepost);
router.get("/getpost/:id", PostController.getpost);
router.get("/getallpost", PostController.getallpost);

module.exports = router;
