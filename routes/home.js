const router = require("express").Router();
const db = require("../models");
require("dotenv").config();
const yelp = require("yelp-fusion");
const { Op } = require("sequelize");

// yelp search variables
const apiKey = process.env.YELPKEY;
const client = yelp.client(apiKey);
let match;

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
  db.Like.findAll({
    where: { [Op.or]: [{ UserId: req.body.id }, { UserId: req.body.matchId }] },
  }).then(likes => {
    let restaurants = [];
    for (let i = 0; i < likes.length; i++) {
      const element = likes[i].dataValues.restaurant_name;
      restaurants.push(element);
    }
    console.log("--------------");
    console.log(restaurants);
    console.log("--------------");
    restaurants = restaurants.sort();
    for (let j = 0; j < restaurants.length; j++) {
      if (restaurants[j] === restaurants[j + 1]) {
        match = restaurants[j];
      }
    }
    console.log("================");
    console.log(match);
    console.log("================");
    if (match) {
      const searchRequest = {
        term: match,
        location: "benicia, ca",
        limit: 1,
      };

      client
        .search(searchRequest)
        .then(response => {
          const result = response.jsonBody.businesses;
          console.log(result);
          const restaurant = {
            name: result[0].name,
            image_url: result[0].image_url,

            rating: result[0].rating,
            display_phone: result[0].display_phone,
          };
          console.log(restaurant);
          // this statement throwing 302 error on browser maybe...
          res.json(restaurant);
        })
        .catch(e => {
          console.log(e);
        });
    } else {
      res.sendStatus(503);
    }
  });
});

router.get("/about", (req, res) => {
  res.render("about");
});

module.exports = router;
