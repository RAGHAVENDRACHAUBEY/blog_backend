const express = require("express");
const User = require("../Modal/User");
const Postmodal = require("../Modal/Post");

class users {
  async deletuser(req, res) {
    let { userId } = req.body;
    let { id } = req.params;
    if (userId === id) {
      try {
        let user = await User.findById(id);
        // console.log(user, "user");
        try {
          let postuser = await Postmodal.deleteMany({
            username: user.username,
          });
          console.log(postuser, "post delete");
          let userdelet = await User.findByIdAndDelete(id);
          console.log(userdelet, "userdelet ");
          return res.status(200).json("User has been Deleted...");
        } catch (error) {
          res.status(500).json(error);
        }
      } catch (error) {
        res.status(500).json("User not found !");
      }
    } else {
      res.status(401).json("you can delete only your account !");
    }
  }

  async getuser(req, res) {
    try {
      let { id } = req.params;
      const users = await User.findById(id);
      let { password, ...others } = users._doc;
      res.status(200).json(others);
      console.log(users, "get users");
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  }
}

const userController = new users();
module.exports = userController;
