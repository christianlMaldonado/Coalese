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
      // console.log("user info ====>" + JSON.stringify(element.dataValues.username, null, 4));
      user.push(element.dataValues.username);
    });
    res.render("matches", { users: user, user: req.user });
  });
});

router.post("/matches", (req, res) => {
  console.log(req.body);
  // db.Like
  res.sendStatus(200);
});

module.exports = router;
