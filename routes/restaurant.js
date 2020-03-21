//'use strict';
require("dotenv").config();
const router = require("express").Router();

const authCheck = (req, res, next) => {
  if (!req.user) {
    // if user is not logged in
    res.redirect("/");
  } else {
    // if logged in
    next();
  }
};
// Place holder for Yelp Fusion's API Key
const yelp = require("yelp-fusion");
const apiKey = process.env.YELPKEY;

const searchRequest = {
  term: "Four Barrel Coffee",
  location: "san francisco, ca",
  radius: 20000,
};

const client = yelp.client(apiKey);
router.post("/", (req, res) => {
  console.log(req.body);
});
router.get("/", authCheck, (req, res) => {
  res.render("restuarants", { user: "it worked" });
});

client
  .search(searchRequest)
  .then(response => {
    const firstResult = response.jsonBody.businesses;
    console.log(firstResult);
    const prettyJson = JSON.stringify(firstResult, null, 4);
    console.log(prettyJson);
  })
  .catch(e => {
    console.log(e);
  });

module.exports = router;
