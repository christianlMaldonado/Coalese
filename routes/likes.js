const router = require("express").Router();
const db = require("../models");

// add data to likes table
router.post("/", (req, res) => {
  const name = req.body.name;
  const address = req.body.address;
  const id = req.body.id;
  db.Like.create({ restaurant_name: name, address: address, UserId: id })
    .then(liked => {
      res.sendStatus(200);
    })
    .catch(err => {
      console.log("Error: " + err);
    });
});

module.exports = router;
