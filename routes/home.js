require("dotenv").config();
const yelp = require("yelp-fusion");

const router = require("express").Router();

const apiKey = process.env.YELPKEY;
const client = yelp.client(apiKey);
const authCheck = (req, res, next) => {
  if (!req.user) {
    // if user is not logged in
    res.redirect("/");
  } else {
    // if logged in
    next();
  }
};

// router.post("/", (req, res) => {

//   const searchRequest = {
//     term: "restaurants",
//     location: req.body.search,
//     radius: 20000,
//     limit: 10
//   };

//   client
//   .search(searchRequest)
//   .then(response => {
//     const firstResult = response.jsonBody.businesses;
    
//     //const prettyJson = JSON.stringify(firstResult, null, 4);
   
//     res.redirect( "/restaurant", 307, firstResult)
//   })
//   .catch(e => {
//     console.log(e);
//   });

// }); 

router.get("/", authCheck, (req, res) => {
  res.render("home", { user: req.user });
});

module.exports = router;

