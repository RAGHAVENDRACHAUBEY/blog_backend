const express = require("express");
const router = express.Router();
const CategoryController = require("../Controller/Category");

router.post("/category", CategoryController.createCategory);
router.get("/allcategory", CategoryController.getcategory);
router.delete("/deletcate/:id", CategoryController.removeCate);

module.exports = router;
