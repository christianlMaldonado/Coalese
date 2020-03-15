// Dependencies
const express = require("express");

// Set up our express app
const app = express();
const PORT = process.env.PORT || 8888;

// Required models for syncing the database
const db = require("./models");

// middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Sets a static directory to add CSS and JS files to HTML doc
app.use(express.static("public"));

// Routes
require("./routes")(app);
require("./routes")(app);
/* Not the full route we will have to build it once we figure out html */

// Syncs sequelize models and starts Express app
/* force:false will allow data in the database to be persistant and not drop
 * database each time app is restarted */
db.sequelize.sync({ force: false }).then(function() {
  app.listen(PORT, function() {
    console.log("App listening on http://localhost:" + PORT);
  });
});
