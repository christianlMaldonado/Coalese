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
    console.log(req.body)
    
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



// =================================================================
// =================================================================
//     class Yelpv3 {

//     constructor(opts) {
//         this.appId = opts.app_id;
//         this.appSecret = opts.app_secret;
//         this.accessToken = '';
//     }

//     getAccessToken() {
//         if (this.accessToken) {
//             return Promise.resolve(this.accessToken);
//         } else {
//             return request({
//                 method: 'POST',
//                 uri: 'https://api.yelp.com/oauth2/token',
//                 form: {
//                     client_id: this.appId,
//                     client_secret: this.appSecret,
//                     grant_type: 'client_credentials'
//                 }
//             }).then((response) => {
//                 this.accessToken = JSON.parse(response).access_token;
//                 return this.accessToken;
//             });
//         }
//     }
// =================================================================
// =================================================================
// const axios = require('axios').default;
// axios.get("${https://arcane-woodland-29279.herokuapp.com}","https://api.yelp.com/v3/businesses/{id}", {
//     headers: {
//         Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`
//     },
//     params: {
//         term: "restaurant",
//         location: "Monterey",
//         radius: 32000,
//         limit: 10,
//     }
// })
//     .then((res) => {
//         console.log(res)
//     })
//     .catch((err) => {
//         console.log ('error')
//     })
