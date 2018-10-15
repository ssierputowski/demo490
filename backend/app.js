const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');

const Info = require('./models/post');

const app = express();

mongoose.connect('mongodb+srv://ssierp:0737@cluster0-igj5c.mongodb.net/test?retryWrites=true')
.then(() => {
  console.log('Connected to MongoDB server')
})
.catch(() => {
  console.log('Connection error!')
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  next();
});

app.post("/api/posts", (req, res, next) => {
  const post = new Info({
    name: req.body.first,
    month: req.body.last,
  });
  post.save();
  console.log(post);
  res.status(201).json({
    message: 'Post added successfully'
  });
});

app.get("/api/posts", (req, res, next) => {
  Info.find().then(documents => {
    res.status(200).json({
      message: "Posts fetched successfully!",
      posts: documents
    });
  });
});

module.exports = app;