const express = require("express");
const User = require("../Modal/User");
const bcryptjs = require("bcryptjs");

class Auth {
  async auth(req, res) {
    try {
      let { username, email, password } = req.body;
      let profileImg = req.files?.filename;
      const salt = await bcryptjs.genSalt(10);
      const haspassword = await bcryptjs.hash(password, salt);
      let Newuser = new User({
        username,
        email,
        password: haspassword,
        profileImg,
      });

      const user = await Newuser.save();
      res.status(200).json({ success: "true" });
      console.log(user);
    } catch (error) {
      console.log(error);
      res.status(403).json({ success: "false" });
    }
  }

  async login(req, res) {
    try {
      let { username, password } = req.body;
      if (!username || !password) {
        return res.status(403).json({ message: "Please fill All Field" });
      }
      const user = await User.findOne({ username });
      if (!user) {
        return res.status(403).json({ error: "username Invaild" });
      }
      const pass = await bcryptjs.compare(password, user.password);
      if (!pass) {
        return res.status(403).json({ error: "Password Invaild" });
      }
      const data = await User.findOne({ username: username });
      console.log(data);
      return res.status(200).json({ success: "Login Success", username: data });
    } catch (error) {
      console.log(error);
    }
  }
  async edituser(req, res) {
    let { userId, username, email, password } = req.body;
    let profileImg = req.files[0]?.filename;

    let obj = {};
    if (username) {
      obj["username"] = username;
    }
    if (email) {
      obj["email"] = email;
    }
    if (profileImg) {
      obj["profileImg"] = profileImg;
    }
    if (password) {
      obj["password"] = await bcryptjs.hash(password, 10);
    }
    console.log("req", obj);

    let user = await User.findByIdAndUpdate(
      userId,
      { $set: obj },
      { new: true }
    );
    console.log("user", user);
    if (user) {
      return res
        .status(200)
        .json({ success: "Updated successfully", user: user });
    }
    return res.status(500).json({ error: "something went wrong" });
  }
}

const authController = new Auth();
module.exports = authController;
