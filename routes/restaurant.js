
const router = require("express").Router();
const yelp = require("yelp-fusion");

const apiKey = process.env.YELPKEY;
const client = yelp.client(apiKey);
let firstResult; 

router.get("/", (req, res) => {
  //  res.render("home", { restaurants: req.body });
  console.log("=================")
  
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
    res.render("restaurant", result)
    //const prettyJson = JSON.stringify(firstResult, null, 4);
    console.log(result);
  })
  .catch(e => {
    console.log(e);
  });
  });

  
router.post("/", (req, res) => {
    
    firstResult=req.body.search
    res.redirect( "/restaurant")
    

    
  
  }); 

  

  module.exports=router;