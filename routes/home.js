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

// checks to see if user is logged in and then renders users to match with
router.get("/matches", authCheck, (req, res) => {
  db.User.findAll({}).then(users => {
    let user = [];
    users.forEach(element => {
      user.push(element.dataValues);
    });
    res.render("matches", { users: user, user: req.user });
  });
});

// queries database for selected user likes to compare
router.post("/matches", (req, res) => {
  console.log(req.body);
  db.Like.findAll({
    where: { [Op.or]: [{ UserId: req.body.id }, { UserId: req.body.matchId }] },
  }).then(likes => {
    let restaurants = [];
    for (let i = 0; i < likes.length; i++) {
      const element = [likes[i].dataValues.restaurant_name, likes[i].dataValues.address];
      restaurants.push(element);
    }

    // sorts through array to find same values and stack them together
    restaurants = restaurants.sort((a, b) => {
      if (a[0] < b[0]) {
        return -1;
      }
      if (a[0] > b[0]) {
        return 1;
      }
      return 0;
    });

    for (let j = 0; j < restaurants.length - 1; j++) {
      if (restaurants[j][0] === restaurants[j + 1][0]) {
        match = restaurants[j];
      }
    }

    if (match) {
      const searchRequest = {
        term: match[0],
        location: match[1],
        limit: 1,
      };

      client
        .search(searchRequest)
        .then(response => {
          const result = response.jsonBody.businesses;
          const restaurant = {
            name: result[0].name,
            image_url: result[0].image_url,
            url: result[0].url,
          };

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

// renders about page
router.get("/about", (req, res) => {
  res.render("about");
});

module.exports = router;
