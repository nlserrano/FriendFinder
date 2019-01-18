// Dependencies
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

var app = express();

var PORT = process.env.PORT || 3030;

// For serving of static CSS
app.use(express.static(__dirname + "/app/css"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

// API and HTML routes
require("./app/routing/apiRoutes.js")(app);
require("./app/routing/htmlRoutes.js")(app);

app.listen(PORT, function() {
    console.log("FriendFinder app listening on PORT: " + PORT);
});



// // Require dependencies
// var express = require('express');
// var bodyParser = require('body-parser');
// var path = require('path');

// // Configure the Express application
// var app = express();
// var PORT = process.env.PORT || 3030;

// app.use(express.static(__dirname + "/app/css"));

// // Expose the public directory to access CSS files
// app.use(express.static(path.join(__dirname, './app/public')));