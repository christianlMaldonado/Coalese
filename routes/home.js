const router = require("express").Router();
const db = require("../models");

const authCheck = (req, res, next) => {
  if (!req.user) {
    // if user is not logged in
    res.redirect("/");
  } else {
    // if logged in
    next();
  }
};

// make sure a user is logged in and display home page
router.get("/", authCheck, (req, res) => {
  res.render("home", { user: req.user });
});

router.get("/matches", authCheck, (req, res) => {
  db.User.findAll({}).then(users => {
    let user = [];
    users.forEach(element => {
      user.push(element.dataValues);
    });
    res.render("matches", { users: user, user: req.user });
  });
});

router.post("/matches", (req, res) => {
  console.log(req.body);
  db.Like.findAll({}).then(likes => {
    let match = [];
    let namesOfRestaurants = [];
    for (let i = 0; i < likes.length; i++) {
      const element = likes[i].dataValues.restaurant_name;
      match.push(element);
    }
    console.log(match);
    res.sendStatus(200);
  });
});

router.get("/about", (req, res) => {
  res.render("about");
});

module.exports = router;
