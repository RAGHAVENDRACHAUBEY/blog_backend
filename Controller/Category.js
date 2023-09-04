const express = require("express");
const Category = require("../Modal/Category");

class Categories {
  async createCategory(req, res) {
    try {
      let { catename } = req.body;
      const newcategory = await Category({ catename });
      let Newcate = await newcategory.save({});
      res.status(200).json({ message: "Category create" });
      console.log(Newcate, "Category");
    } catch (error) {
      res.status(500).json(error);
    }
  }
  async getcategory(req, res) {
    try {
      const allcategory = await Category.find();
      res.status(200).json(allcategory);
      // console.log(allcategory, "category");
    } catch (error) {
      res.status(500).json("error");
    }
  }

  async removeCate(req, res) {
    try {
      let { id } = req.params;
      const deletecate = await Category.findById(id);
      return res
        .status(200)
        .json({ success: deletecate, msg: "Categories Delete" });
    } catch (error) {
      console.log(error);
    }
  }
}

const CategoryController = new Categories();
module.exports = CategoryController;
