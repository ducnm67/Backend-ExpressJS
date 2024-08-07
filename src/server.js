const express = require("express");
const path = require("path");
require("dotenv").config();

const app = express();

// Set up environment variables
const port = process.env.PORT || 3000;
const hostname = process.env.HOST_NAME;

//config template engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

//config static files
app.use(express.static(path.join(__dirname, "public")));

//config routes
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/sample", (req, res) => {
  res.render("sample.ejs");
});

//run app
app.listen(port, hostname, () => {
  console.log(`Example app listening on port ${port}`);
});
