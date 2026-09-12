const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt-nodejs");
const cors = require("cors");

const store = require("./store");
const signup = require("./controllers/signup");
const signin = require("./controllers/signin");
const profile = require("./controllers/profile");
const image = require("./controllers/image");

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.get("/", (req, res) => res.send("smart-brain api"));
app.post("/signin", signin.handleSignin(store, bcrypt));
app.post("/signup", (req, res) => signup.handleSignup(req, res, store, bcrypt));
app.get("/profile/:id", (req, res) =>
  profile.handleProfileGet(req, res, store),
);
app.put("/image", (req, res) => image.handleImage(req, res, store));
app.post("/imageurl", (req, res) => image.handleApiCall(req, res));

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`app is running on port ${port}`);
});
