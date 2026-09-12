const express = require("express");
const cors = require("cors");
const bcrypt = require("./passwords");

const signup = require("./controllers/signup");
const signin = require("./controllers/signin");
const profile = require("./controllers/profile");
const image = require("./controllers/image");
const store = require("./store");

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) =>
  res.json({ status: "ok", service: "face-detect-url-api" }),
);
app.post("/signin", signin.handleSignin(store, bcrypt));
app.post("/signup", (req, res) => signup.handleSignup(req, res, store, bcrypt));
app.get("/profile/:id", (req, res) =>
  profile.handleProfileGet(req, res, store),
);
app.put("/image", (req, res) => image.handleImage(req, res, store));
app.post("/imageurl", (req, res) => image.handleApiCall(req, res));

app.listen(port, () => {
  console.log(`face-detect-url-api is running on port ${port}`);
});

module.exports = app;
