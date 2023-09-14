// required config

require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const { URL } = require("./utils/config");

//loading dummy data //uncomment and use
// const { users, posts } = require("./data/index");
// const User = require("./model/userModel");
// const Post = require("./model/postModel");

//getting All router

const authRouter = require("./routes/authRouter");
const userRouter = require("./routes/userRoutes");
const postRouter = require("./routes/postRoutes");

//setting up app
const app = express();
app.use(express.json());
app.use(cors());

mongoose.set("strictQuery", false);

mongoose
  .connect(URL)
  .then(() => {
    console.log("connected to Mongo DB");
    //adding dummy data //uncomment and use
    // User.insertMany(users);
    // Post.insertMany(posts);
  })
  .catch((err) => {
    console.error(err.message);
  });

app.get("/", (req, res) => {
  res.send("Welcome to ShareSpace");
});

app.use(postRouter);
app.use(authRouter);
app.use(userRouter);

module.exports = app;
