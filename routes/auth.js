const router = require("express").Router();
const passport = require("passport");
const User = require("../models/user");
const db = require("../models");

router.get("/logout", (req, res) => {
  //handle with passport
  req.logout();
  res.redirect("/");
});

router.post("/", passport.authenticate("local", { failureRedirect: "/" }), (req, res) => {
  res.redirect("/home");
});

router.get("/register", (req, res) => {
  res.render("register");
});

// add new user to database
router.post("/register", (req, res) => {
  console.log(req.body);
  const body = req.body;
  db.User.create({ username: body.username, email: body.email, password: body.password }).then(
    newUser => {
      console.log("New User", newUser);
      res.redirect("/");
    }
  );
});

module.exports = router;
