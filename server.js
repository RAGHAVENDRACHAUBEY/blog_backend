const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");

dotenv.config();

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());
app.use(express.static("Public"));
app.use(express.urlencoded({ extended: false }));

// Router

const authrouter = require("./Route/User");
const postrouter = require("./Route/Post");
const category = require("./Route/category");
mongoose
  .connect(process.env.Blog_DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Database Connected........."))
  .catch((err) => console.log("Database Not Connected !!!"));

const PORT = process.env.PORT || 8000;

//routes
app.use("/api/auth", authrouter);
app.use("/api/posts", postrouter);
app.use("/api/cate", category);

app.get("/", (req, res) => {
  res.send("Welcome Blog website");
});
app.listen(PORT, () => {
  console.log(`Server is runing http://localhost:${PORT}`);
});
