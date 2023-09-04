const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
    },
    desc: {
      type: String,
      required: true,
    },
    photo: {
      type: String,
    },
    username: {
      type: String,
    },
    category: {
      type: Array,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", PostSchema);
