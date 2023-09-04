const express = require("express");
const Postmodal = require("../Modal/Post");
const User = require("../Modal/User");

class Post {
  // Create Post
  async createpost(req, res) {
    try {
      let { title, desc, username, category } = req.body;
      let photo = req.files[0]?.filename;
      const newPosts = new Postmodal({
        title,
        desc,
        photo,
        username,
        category,
      });
      let userpost = await newPosts.save();
      res.status(200).json({ success: userpost, msg: "Post create" });
      console.log(userpost, "post");
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: "Post not created" });
    }
  }

  // Update Post
  async editpost(req, res) {
    try {
      let { title, desc, category, username } = req.body;
      let id = req.params.id;
      // let photo = req.files[0]?.filename;
      console.log("tytyt", req.body);
      let obj = {};
      if (title) {
        obj["title"] = title;
      }
      if (desc) {
        obj["desc"] = desc;
      }
      if (category) {
        obj["category"] = category;
      }
      if (req?.files?.length > 0) {
        req?.files?.map((item) => {
          if (item?.fieldname === "photo") {
            obj["photo"] = item?.filename;
          }
        });
      }

      const post = await Postmodal.findById(id);
      console.log("UserNAme check", username, post.username);
      if (post.username === username) {
        try {
          let updatedPost = await Postmodal.findByIdAndUpdate(
            id,
            {
              $set: obj,
            },
            { new: true }
          );
          res
            .status(200)
            .json({ success: updatedPost, msg: "Successfully Update" });
        } catch (err) {
          res.status(500).json("Post not update");
        }
      } else {
        res.status(401).json("You can update only your post!");
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ msg: "user id not found" });
    }
  }
  // Delete Post

  async deletepost(req, res) {
    let id = req.params.id;
    const { username } = req.body;
    try {
      const post = await Postmodal.findById(id);
      if (post.username === username) {
        try {
          await Postmodal.deleteOne({ _id: id });
          res.status(200).json("Post has been deleted...");
        } catch (err) {
          res.status(500).json("Post has been not deleted");
        }
      } else {
        res.status(401).json("You can delete only your post!");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  }

  // Get Post with Id
  async getpost(req, res) {
    try {
      const post = await Postmodal.findById(req.params.id);
      res.status(200).json(post);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  // Get All Post

  async getallpost(req, res) {
    const username = req.query.user;
    const catName = req.query.cat;
    try {
      let posts;
      if (username) {
        posts = await Postmodal.find({ username });
      } else if (catName) {
        posts = await Postmodal.find({
          category: {
            $in: [catName],
          },
        });
      } else {
        posts = await Postmodal.find({});
      }
      console.log("333", posts);
      res.status(200).json({ posts: posts });
      console.log(posts);
    } catch (error) {
      res.status(500).json(error);
    }
  }
}
const PostController = new Post();
module.exports = PostController;
