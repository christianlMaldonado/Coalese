require("dotenv").config();
const router = require("express").Router();
const yelp = require("yelp-fusion");

// yelp search variables
const apiKey = process.env.YELPKEY;
const client = yelp.client(apiKey);
let firstResult;

// check to make sure user is logged in
const authCheck = (req, res, next) => {
  if (!req.user) {
    // if user is not logged in
    res.redirect("/");
  } else {
    // if logged in
    next();
  }
};

// restaurants page get request
router.get("/", authCheck, (req, res) => {
  const searchRequest = {
    term: "restaurants",
    location: firstResult,
    radius: 20000,
    limit: 10
  };

  client
    .search(searchRequest)
    .then(response => {
      const result = response.jsonBody.businesses;
      console.log(JSON.stringify(result, null, 2));
      res.render("restaurant", { restaurants: result, user: req.user });
    })
    .catch(e => {
      console.log(e);
    });
});

router.post("/", (req, res) => {
  firstResult = req.body.search;
  res.redirect("/restaurant");
});

module.exports = router;
