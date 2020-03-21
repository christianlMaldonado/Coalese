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

router.post("/", (req, res) => {
  console.log(req.body)
  
}); 
router.get("/", authCheck, (req, res) => {
  res.render("home", { user: req.user });
});

module.exports = router;

